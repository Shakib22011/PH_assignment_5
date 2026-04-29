const signin=()=>{
    const username=document.getElementById('username');
    const password=document.getElementById('password');

    if(username.value==='admin' && password.value==='admin123'){
        alert('Login Successful');
        window.location.href='dashboard.html';
    }
    else{
        alert("Invalid Credentials !!!");
        return;
    }
}