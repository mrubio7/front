const ApiLocalStorage = {
    Save: (key:string, value:any) => {
        localStorage.setItem(key, JSON.stringify(value))
    },
    Get: (key:string) => {
        const data = localStorage.getItem(key)
        if (data != null)
            return JSON.parse(data)
        return null
    }
}

export default ApiLocalStorage