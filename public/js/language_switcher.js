(() => {
    // 语言切换器只做 URL 层面的 lang 参数切换，真正的语言持久化由后端中间件写 cookie。
    const languageSwitcher = document.querySelector('[data-language-switcher]');
    const languageButtons = document.querySelectorAll('[data-lang-option]');
    const languageToggle = document.querySelector('[data-language-toggle]');

    if (!languageSwitcher || !languageToggle || languageButtons.length === 0) {
        return;
    }

    function setExpanded(expanded) {
        languageSwitcher.classList.toggle('is-expanded', expanded);
        languageToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }

    languageToggle.addEventListener('click', () => {
        setExpanded(!languageSwitcher.classList.contains('is-expanded'));
    });

    languageButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const nextLang = button.dataset.langOption;

            if (!nextLang) {
                return;
            }

            setExpanded(false);

            const nextUrl = new URL(window.location.href);
            // 语言切换通过刷新到带 ?lang=... 的地址生效，
            // 服务端中间件会据此重新渲染页面并顺手写入语言 cookie。
            nextUrl.searchParams.set('lang', nextLang);
            window.location.href = nextUrl.toString();
        });
    });

    document.addEventListener('click', (event) => {
        if (!languageSwitcher.contains(event.target)) {
            setExpanded(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setExpanded(false);
        }
    });
})();
