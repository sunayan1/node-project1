

export const loginService = async (loginData)=>{
    const email= loginData.email
    const password= loginData.password;
    console.log("Checking Database for login");

    if(email=="hari@gmail.com"){
        return {message: "Login successfull"};
    }

    else{
        return {message: "Login failed"};
    }
    
};