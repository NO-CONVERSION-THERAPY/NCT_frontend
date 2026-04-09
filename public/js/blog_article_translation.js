(function progressivelyTranslateBlogArticle() {
    // 博客文章页只在英文界面按段落渐进翻译，避免首屏就为整篇文章阻塞渲染。
    if (window.APP_LANG !== 'en') {
        return;
    }

    const translationNodes = Array.from(document.querySelectorAll('[data-blog-translation-source]'));
    const REQUEST_BATCH_SIZE = 6;

    if (translationNodes.length === 0) {
        return;
    }

    function getCacheKey(targetLanguage, text) {
        return `blog-translation:${targetLanguage}:${text}`;
    }

    function readTranslationCache(targetLanguage, text) {
        try {
            return window.sessionStorage.getItem(getCacheKey(targetLanguage, text));
        } catch (error) {
            console.warn('读取博客翻译缓存失败:', error);
            return null;
        }
    }

    function writeTranslationCache(targetLanguage, text, translatedText) {
        try {
            window.sessionStorage.setItem(getCacheKey(targetLanguage, text), translatedText);
        } catch (error) {
            console.warn('写入博客翻译缓存失败:', error);
        }
    }

    function revealTranslation(node, translatedText) {
        if (!node || !translatedText) {
            return;
        }

        node.textContent = translatedText;
        node.hidden = false;
        node.classList.add('is-visible');
        node.dataset.translationState = 'loaded';
    }

    function chunkEntries(entries, size) {
        const chunks = [];

        for (let index = 0; index < entries.length; index += size) {
            chunks.push(entries.slice(index, index + size));
        }

        return chunks;
    }

    async function requestTranslations(items) {
        // 博客前端不直接碰第三方翻译服务，统一回到站内 API，
        // 这样可以复用服务端限流、缓存和错误处理策略。
        const response = await window.fetch('/api/translate-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                targetLanguage: window.APP_LANG,
                items
            })
        });

        const payload = await response.json();

        if (!response.ok) {
            throw new Error(payload.error || 'Translation unavailable');
        }

        return Array.isArray(payload.translations) ? payload.translations : [];
    }

    async function hydrateTranslationNodes(nodes) {
        const pendingEntries = [];

        nodes.forEach((node, index) => {
            const sourceText = String(node.dataset.blogTranslationSource || '').trim();

            if (!sourceText) {
                return;
            }

            const cachedTranslation = readTranslationCache(window.APP_LANG, sourceText);

            if (cachedTranslation) {
                // 同一个标签页里再次打开文章时优先复用 sessionStorage，减少重复翻译请求。
                revealTranslation(node, cachedTranslation);
                return;
            }

            node.dataset.translationState = 'loading';
            pendingEntries.push({
                fieldKey: String(index),
                node,
                sourceText
            });
        });

        for (const entryChunk of chunkEntries(pendingEntries, REQUEST_BATCH_SIZE)) {
            try {
                // 分块请求能把失败范围控制在当前批次，也避免单次请求正文过长。
                const translations = await requestTranslations(entryChunk.map((entry) => ({
                    fieldKey: entry.fieldKey,
                    text: entry.sourceText
                })));
                const translatedTextByFieldKey = Object.create(null);

                translations.forEach((entry) => {
                    if (!entry || typeof entry.fieldKey !== 'string') {
                        return;
                    }

                    translatedTextByFieldKey[entry.fieldKey] = typeof entry.translatedText === 'string'
                        ? entry.translatedText.trim()
                        : '';
                });

                entryChunk.forEach(({ fieldKey, node, sourceText }) => {
                    const translatedText = translatedTextByFieldKey[fieldKey] || '';

                    if (!translatedText) {
                        // 空结果不抛错，只标记状态，让页面继续展示原文。
                        node.dataset.translationState = 'empty';
                        return;
                    }

                    writeTranslationCache(window.APP_LANG, sourceText, translatedText);
                    revealTranslation(node, translatedText);
                });
            } catch (error) {
                console.error('博客段落翻译失败:', error);
                entryChunk.forEach(({ node }) => {
                    node.dataset.translationState = 'error';
                });
            }

            await new Promise((resolve) => window.setTimeout(resolve, 0));
        }
    }

    (async () => {
        await hydrateTranslationNodes(translationNodes);
    })();
})();
