function queryUpd(addQname,addQvalue) {
    
    const urlParams = new URLSearchParams(window.location.search);

    if (addQvalue.trim() !== '') {
        urlParams.set(addQname, addQvalue.trim());
    } else {
        // 输入为空时删除参数
        urlParams.delete(addQname);
    }

    //把新参数同步到 URL
    // 这里用 replaceState 而不是 pushState，避免每次筛选都在浏览器历史里堆一条记录。
    window.history.replaceState({}, '', 
        window.location.pathname + '?' + urlParams.toString()
    );
    window.location.reload();
}

document.querySelectorAll('[data-query-name]').forEach((button) => {
    button.addEventListener('click', () => {
        queryUpd(button.dataset.queryName || '', button.dataset.queryValue || '');
    });
});
