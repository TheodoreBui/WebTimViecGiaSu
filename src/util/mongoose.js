const { default: mongoose } = require("mongoose")

module.exports = {
    multipleMongooseToObject: (mongooses) => {
        return mongooses.map(mongoose => mongoose.toObject())
    },
    mongooseToObject: (mongoose) => {
        return mongoose ? mongoose.toObject() : mongoose
    },
    slogan: (tenxe)=>{
        const myArr = tenxe.split(' ')
        const hangxe = myArr[0].toLowerCase()

        switch(hangxe){
            case 'mercedes': return 'Engineered like no other car in the world';
            case 'bmw': return 'The Ultimate Driving Machine';
            case 'audi': return 'Engineered like no other car in the world';
            case 'ford': return 'Go Further';
            case 'hyundai': return 'New thinking - New potential';
            case 'kia': return 'The Power to Surprise';
            case 'chevrolet' : return 'Find New Roads'
            case 'lexus' : return 'The Relentless Pursuit of Perfection'
            case 'toyota' : return 'Pioneering power'
            case 'vinfat' : return 'Mãnh liệt tinh thần Việt Nam'
            case 'range' : return 'Above and beyond'
            case 'porche' : return 'There Is No Substitute'
            case 'lamborghini' : return 'Expect the Unexpected'
            case 'rolls-royce' : return 'Trusted to Deliver Excellence'
            case 'bugatti' : return 'Breaking New Dimensions'
            default: return 'Xe của người Việt'
        }      
    },
    mongooseToArray: (mongoose)=>{
        if(typeof mongoose === 'string'){
            const arr =[mongoose]
            return arr
        }
        return mongoose
    },
    mongooseFilerPrice: (mongoose)=>{
        let arr =[]

        if (mongoose[0] == 0){
            arr.push(0)
            arr.push(0)
            arr.push(0)
            return arr
        } 
        else {
            arr.push(999999999999)
            if(mongoose[0] == 3000001){
                arr.push(0)
                arr.push(3000001)
                return arr
            }
            else {
                arr.push(mongoose[mongoose.length-2])
                if(mongoose[mongoose.length-1]==3000001) arr.push(mongoose[mongoose.length-1])
                else {
                    arr.pop()
                    arr.push(mongoose[mongoose.length-1])
                    arr.push(999999999999)
                }
            }
        }
        return arr
    }
}