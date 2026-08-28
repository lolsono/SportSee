function getCookie(name) {
    const cookies = document.cookie.split("; ");

    const cookie = cookies.find(cookie => cookie.startsWith(`${name}=`));

    if (!cookie) {
        return null;
    }

    return decodeURIComponent(cookie.substring(name.length + 1));
}

export default getCookie;
