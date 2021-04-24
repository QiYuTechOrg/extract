export function checkIfNumber(s: string) {
    return !isNaN(parseInt(s));
}

/// 忽略有毒的数据
export function checkHumanCanView(e: HTMLElement) {
    console.log("useless data: ", e)
    if (e.style.display === 'none' || e.style.visibility === 'hidden') {
        return false;
    }
    const rect = e.getBoundingClientRect();

    return !(rect.width < 6 || rect.height < 6);
}
