(() => {
    let currentMarker = null;
    let formMap = null;
    let formMapTileLayer = null;
    let leafletAssetsPromise = null;
    const i18n = window.I18N;
    const openMapButton = document.getElementById('openMapButton');
    const themeMediaQuery = typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null;

    function isDarkMode() {
        return Boolean(themeMediaQuery && themeMediaQuery.matches);
    }

    function createFormMapTileLayer() {
        if (isDarkMode()) {
            return L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
                subdomains: 'abcd',
                maxZoom: 20,
                minZoom: 3
            });
        }

        return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 20,
            minZoom: 3
        });
    }

    function ensureLeafletCss() {
        if (document.querySelector('link[data-form-leaflet-css]')) {
            return;
        }

        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        stylesheet.setAttribute('data-form-leaflet-css', 'true');
        document.head.appendChild(stylesheet);
    }

    function loadLeafletScript() {
        return new Promise((resolve, reject) => {
            const existingScript = document.querySelector('script[data-form-leaflet-script]');
            if (existingScript) {
                existingScript.addEventListener('load', resolve, { once: true });
                existingScript.addEventListener('error', reject, { once: true });
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.async = true;
            script.setAttribute('data-form-leaflet-script', 'true');
            script.addEventListener('load', resolve, { once: true });
            script.addEventListener('error', reject, { once: true });
            document.body.appendChild(script);
        });
    }

    async function ensureLeafletAssets() {
        if (typeof L !== 'undefined') {
            return;
        }

        if (!leafletAssetsPromise) {
            ensureLeafletCss();
            leafletAssetsPromise = loadLeafletScript()
                .catch((error) => {
                    leafletAssetsPromise = null;
                    throw error;
                });
        }

        await leafletAssetsPromise;
    }

    function mountFormMapTileLayer() {
        if (!formMap) {
            return;
        }

        if (formMapTileLayer) {
            formMap.removeLayer(formMapTileLayer);
        }

        formMapTileLayer = createFormMapTileLayer();
        formMapTileLayer.addTo(formMap);
    }

    async function ensureFormMap() {
        if (formMap) {
            return formMap;
        }

        await ensureLeafletAssets();

        const mapContainer = document.getElementById('map');
        if (!mapContainer || typeof L === 'undefined') {
            return null;
        }

        formMap = L.map(mapContainer).setView([37.5, 109], 3);
        mountFormMapTileLayer();

        formMap.on('click', function(e) {
            const lat = e.latlng.lat.toFixed(6);
            const lng = e.latlng.lng.toFixed(6);

            if (currentMarker !== null) {
                formMap.removeLayer(currentMarker);
            }

            const addressInput = document.getElementById('addr');
            if (addressInput) {
                addressInput.value = `latlng${lat},${lng}`;
            }

            currentMarker = L.marker([lat, lng]).addTo(formMap)
                .bindPopup(
                    i18n.form.hints.selectedPoint
                        .replace('{lat}', lat)
                        .replace('{lng}', lng)
                )
                .openPopup();
        });

        return formMap;
    }

    window.openMap = async function openMap() {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) {
            return;
        }

        const willShowMap = mapContainer.style.display !== 'block';
        mapContainer.style.display = willShowMap ? 'block' : 'none';

        if (!willShowMap) {
            return;
        }

        if (openMapButton) {
            openMapButton.disabled = true;
        }

        let mapInstance = null;

        try {
            mapInstance = await ensureFormMap();
        } finally {
            if (openMapButton) {
                openMapButton.disabled = false;
            }
        }

        if (!mapInstance) {
            return;
        }

        setTimeout(() => {
            mapInstance.invalidateSize();
        }, 100);
    };

    if (openMapButton) {
        openMapButton.addEventListener('click', window.openMap);
    }

    if (themeMediaQuery) {
        const handleThemeChange = () => {
            if (formMap) {
                mountFormMapTileLayer();
            }
        };

        if (typeof themeMediaQuery.addEventListener === 'function') {
            themeMediaQuery.addEventListener('change', handleThemeChange);
        } else if (typeof themeMediaQuery.addListener === 'function') {
            themeMediaQuery.addListener(handleThemeChange);
        }
    }
})();
