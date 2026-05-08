(function () {
    const passClass = 'py-3 rounded-xl border-2 border-green-500 bg-green-500 text-white font-semibold transition-all';
    const inactivePassClass = 'py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-green-50 hover:text-green-600 hover:border-green-300 transition-all';
    const failClass = 'py-3 rounded-xl border-2 border-red-500 bg-red-500 text-white font-semibold transition-all';
    const inactiveFailClass = 'py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all';

    function getInstrumentSelection() {
        try {
            return Array.isArray(instrumentSelection) ? instrumentSelection : [];
        } catch (error) {
            return [];
        }
    }

    function getCompressedAirResult() {
        try {
            return compressedAirResult || 'pass';
        } catch (error) {
            return 'pass';
        }
    }

    function setCompressedAirResultValue(type) {
        try {
            compressedAirResult = type;
        } catch (error) {
            window.compressedAirResult = type;
        }
    }

    window.renderInstrumentTable = function renderInstrumentTable() {
        const tbody = document.getElementById('instrumentTableBody');
        const emptyState = document.getElementById('instrumentEmptyState');
        const selection = getInstrumentSelection();

        if (!tbody || !emptyState) return;

        tbody.innerHTML = '';

        if (selection.length === 0) {
            emptyState.classList.remove('hidden');
            emptyState.classList.add('flex');
            return;
        }

        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');

        selection.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="px-4 py-4 text-center font-semibold text-gray-700">${index + 1}</td>
                <td class="px-4 py-4 text-gray-900 font-medium">${item.name}</td>
                <td class="px-4 py-4 text-gray-600">${item.model}</td>
                <td class="px-4 py-4 font-mono text-gray-700">${item.code}</td>
                <td class="px-4 py-4 text-gray-600">${item.expiry}</td>
                <td class="px-4 py-4 text-center">
                    <button onclick="removeInstrument('${item.code}')" class="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors">
                        移除
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    };

    window.renderInstrumentAttributePanel = function renderInstrumentAttributePanel() {
        const container = document.getElementById('instrumentAttributePanel');
        if (!container) return;

        container.innerHTML = `
            <div class="bg-white rounded-2xl industrial-shadow p-6 h-full">
                <div class="mb-6">
                    <h3 class="text-xl font-bold text-gray-900">仪器检测属性</h3>
                    <p class="text-sm text-gray-500 mt-2">填写本工单对应的环境与检测参数</p>
                </div>

                <div class="space-y-5">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-3">压缩空气检测</label>
                        <div class="grid grid-cols-2 gap-3">
                            <button type="button" id="btnAirPass" onclick="setCompressedAirResult('pass')" class="${inactivePassClass}">
                                合格
                            </button>
                            <button type="button" id="btnAirFail" onclick="setCompressedAirResult('fail')" class="${inactiveFailClass}">
                                不合格
                            </button>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">磨料电导率（%）</label>
                        <input id="instrumentAbrasiveConductivity" type="number" min="0" step="0.01" placeholder="请输入百分比数值" class="form-input w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500">
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">光照度</label>
                        <input id="instrumentIlluminance" type="number" min="0" step="0.1" placeholder="请输入光照度数值" class="form-input w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500">
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">盐分</label>
                        <input id="instrumentSalinity" type="number" min="0" step="0.01" placeholder="请输入盐分数值" class="form-input w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500">
                    </div>

                    <button type="button" onclick="saveInstrumentAttributes()" class="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                        保存
                    </button>
                </div>
            </div>
        `;
        window.setCompressedAirResult(getCompressedAirResult());
    };

    window.setCompressedAirResult = function setCompressedAirResult(type) {
        setCompressedAirResultValue(type);

        const passBtn = document.getElementById('btnAirPass');
        const failBtn = document.getElementById('btnAirFail');
        if (!passBtn || !failBtn) return;

        if (type === 'pass') {
            passBtn.className = passClass;
            failBtn.className = inactiveFailClass;
        } else {
            passBtn.className = inactivePassClass;
            failBtn.className = failClass;
        }
    };

    window.saveInstrumentAttributes = function saveInstrumentAttributes() {
        const abrasiveConductivity = document.getElementById('instrumentAbrasiveConductivity')?.value.trim() || '';
        const illuminance = document.getElementById('instrumentIlluminance')?.value.trim() || '';
        const salinity = document.getElementById('instrumentSalinity')?.value.trim() || '';

        if (!abrasiveConductivity || !illuminance || !salinity) {
            showToast('请填写完整的仪器检测属性', 'error');
            return;
        }

        showToast(`仪器检测属性已保存，压缩空气检测为${getCompressedAirResult() === 'pass' ? '合格' : '不合格'}`, 'success');
    };

    document.addEventListener('DOMContentLoaded', function () {
        window.renderInstrumentAttributePanel();
    });
})();
