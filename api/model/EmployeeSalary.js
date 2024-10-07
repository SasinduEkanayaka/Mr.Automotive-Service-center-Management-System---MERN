import mongoose from "mongoose";


// const employeeSalarySchema = new mongoose.Schema({
//     employeeName: String,
//     NIC: String,
//     formDate: Date,
//     toDate: Date,
//     totalOThours: { type: Number, default: 0 },
//     totalOTpay: { type: Number, default: 0 },
//     basicSalary: { type: Number, required: true },
//     totalSalary: { type: Number, default: 0 },
// });


const employeeSalarySchema = mongoose.Schema({
    employeeName : {
        type : String,
        required : true
    },

    NIC: {
        type: String,
        required: true
    },

    formDate: {
        type: String,
        required: true,
    },

    toDate:{
        type: String,
        required: true,
    },

    totalOtHours:{
        type: Number
        
    },

    totalOtAmount:{
        type: Number
        
    },

    basicSalary:{
        type:Number,
        required: true, 
    },

    totalSalary:{
        type:Number
    
    },
    // status:{
    //     type:String,
    //     enum:['pending','approved','declined'],
    //     default: 'pending',
    // }
});

export const EmployeeSalary = mongoose.model('EmployeeSalary',employeeSalarySchema)