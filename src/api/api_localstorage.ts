const ApiLocalStorage = {
    Token: {
        Save: (value:any) => {
            localStorage.setItem("token", JSON.stringify(value))
        },
        Get: () => {
            const data = localStorage.getItem("token")
            if (data != null)
                return JSON.parse(data)
            return null
        }
    },
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