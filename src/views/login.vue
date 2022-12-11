<template>
    <Modal :title="modalTitle" :message="modalMessage" ref="lModal" />
    <div class="customContainer container-fluid">
        <div class="login rounded-4 position-absolute top-50 start-50 translate-middle">
            <div class="first">
                <router-link class="router-link" to="/">
                    <div class="nahida"></div>
                </router-link>
            </div>
            <div class="w-75 mx-auto mt-5">
                <input v-model="accountValue" type="text" class="form-control p-2" id="colFormLabel"
                    placeholder="请输入账号/邮箱">
            </div>
            <div class="w-75 mx-auto mt-3">
                <input v-model="passwordValue" type="password" class="form-control p-2" id="colFormLabel"
                    placeholder="请输入密码">
            </div>
            <div class="w-75 mx-auto mt-5">
                <button type="button" class="w-100 btn btn-danger p-2" @click="login">登录</button>
            </div>
            <div class="w-100">
                <ul class="me-5 mt-5 justify-content-end d-flex">
                    <li class="nav-item">
                        <router-link class="router-link" to="forgot">
                            <a class="nav-link text-muted">忘记密码</a>
                        </router-link>
                    </li>
                    <li class="nav-item ms-3">
                        <router-link class="router-link" to="register">
                            <a class="nav-link text-muted">立即注册</a>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Modal from '../components/Modal/index.vue'
import router from '../router/router';
const accountValue = ref('')
const passwordValue = ref('')

// 模态框
const modalTitle = ref('')
const modalMessage = ref('')
const lModal = ref<InstanceType<typeof Modal>>()

const login = () => {
    if (accountValue.value && passwordValue.value) {
        fetch('http://localhost:1314/api/user/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify({
                UserAccount: accountValue.value,
                UserPassword: passwordValue.value
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
            if (res.status == 403) {
                console.log(res.json());
                modalTitle.value = '{{{(>_<)}}}'
                modalMessage.value = '用户不存在或密码错误'
                lModal.value?.showModal()
            } else {
                router.push('/')
            }
        })
    } else {
        modalTitle.value = '{{{(>_<)}}}'
        modalMessage.value = '请输入用户账号和密码'
        lModal.value?.showModal()
    }
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