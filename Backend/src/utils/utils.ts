// utils/utils.ts

const formatDate = (date: Date) => {
    let month, day, year, hour, min

    year = date.getFullYear()
    month = (date.getMonth() + 1 <= 9) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1) 
    day = (date.getDate() <= 9) ? '0' + date.getDate() : date.getDate()

    hour = (date.getHours() <= 9) ? '0' + date.getHours() : date.getHours()
    min = (date.getMinutes() <= 9) ? '0' + date.getMinutes() : date.getMinutes()

    return `${year}-${month}-${day} ${hour}:${min}:00`
}

const generatorRef = (initials : string):string =>{

    const _arrayCaracteres = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    

    const generator = (num : number) =>{
    let result = ''

        for (let i = 1; i <=num; i++) {
            const random = Math.floor(Math.random()*(_arrayCaracteres.length))
            
            result +=_arrayCaracteres[random]            
        }
        return result
    }

    const refPart1 = generator(5)
    const refPart2 = generator(3)

    return `${initials}${refPart1}-${refPart2}`
}

export { formatDate , generatorRef}
