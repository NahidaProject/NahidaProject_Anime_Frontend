<template>
    <div class="customContainer">
        <div class="login rounded-4 position-absolute top-50 start-50 translate-middle">
            <div class="first">
                <div class="nahida"></div>
            </div>
            <div class="w-75 mx-auto mt-5">
                <input type="text" class="form-control p-3" id="colFormLabel" placeholder="请输入账号/邮箱">
            </div>
            <div class="w-75 mx-auto mt-3">
                <input type="password" class="form-control p-3" id="colFormLabel" placeholder="请输入密码">
            </div>
            <div class="w-75 mx-auto mt-5">
                <button type="button" class="w-100 btn btn-danger p-2" @click="login">登录</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const login=()=>{
    console.log('Login');
}
</script>

<style scoped>
.customContainer {
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/acfunlogin.png');
    background-size: cover;
    background-position: center;
    min-width: 800px;
}

.login {
    background: #fff;
    opacity: .95;
    box-sizing: border-box;
    min-width: 300px;
    min-height: 400px;
    width: 30vw;
}

.nahida {
    background-image: url('../assets/Nahida-m.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100px;
    height: 40px;
}

.form-control {
    font-size: 18px;
}

.form-control::placeholder {
    font-weight: 300;
    color: #afb2b3;
}

.first {
    width: 200px;
}
</style>