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
        
    }
}