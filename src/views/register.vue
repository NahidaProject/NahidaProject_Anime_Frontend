<template>
    <Modal />
    <div class="customContainer container-fluid">
        <div class="login rounded-4 position-absolute top-50 start-50 translate-middle">
            <div class="first">
                <router-link class="router-link" to="/">
                    <div class="nahida"></div>
                </router-link>
            </div>
            <div class="w-75 mx-auto mt-5">
                <input v-model="UserName" type="text" class="form-control p-2" id="colFormLabel" placeholder="请输入昵称">
            </div>
            <div class="w-75 mx-auto mt-3">
                <input v-model="UserAccount" type="text" class="form-control p-2" id="colFormLabel" placeholder="请输入账号">
            </div>
            <div class="w-75 mx-auto mt-3">
                <input v-model="UserPassword" type="password" class="form-control p-2" id="colFormLabel"
                    placeholder="请输入密码">
            </div>
            <div class="w-75 mx-auto mt-3">
                <input type="password" class="form-control p-2" id="colFormLabel" placeholder="确认密码">
            </div>
            <div class="w-75 mx-auto mt-3">
                <input v-model="UserGender" type="text" class="form-control p-2" id="colFormLabel" placeholder="请选择性别">
            </div>
            <div class="w-75 mx-auto mt-5">
                <button type="button" class="w-100 btn btn-danger p-2" @click="register">注册</button>
            </div>
            <div class="w-100">
                <ul class="me-5 mt-5 justify-content-end d-flex">
                    <li class="nav-item">
                        <router-link class="router-link" to="forgot">
                            <a class="nav-link text-muted">忘记密码</a>
                        </router-link>
                    </li>
                    <li class="nav-item ms-3">
                        <router-link class="router-link" to="login">
                            <a class="nav-link text-muted">返回登录</a>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '../components/Modal/index.vue'
import Bus from '../Bus'

const UserName = ref('')
const UserAccount = ref('')
const UserGender = ref('')
const UserPassword = ref('')

const register = () => {
    fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/user/GetCurrentUserID`).then(res => res.json()).then(data => {
        const date = new Date()
        fetch(`http://${import.meta.env.VITE_BACKEND_DOMAIN}:${import.meta.env.VITE_BACKEND_PORT}/api/user/NewUser`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify({
                UserID: data,
                UserName: UserName.value,
                UserAccount: UserAccount.value,
                UserPassword: UserPassword.value,
                UserGender: UserGender.value,
                UserRegisterDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
            if (res.status == 200) {
                Bus.emit('showmessage', {
                    title: '(●\'◡\'●)',
                    message: '注册成功'
                })
            }
        })
    })
}
</script>

<style scoped>
.customContainer {
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/acfunlogin.png');
    background-size: cover;
    background-position: center;
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
    font-size: 13px;
}

.form-control::placeholder {
    font-weight: 300;
    color: #afb2b3;
}

.first {
    width: 200px;
}
</style>