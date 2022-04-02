<script setup>
import { RouterLink, useRouter } from "vue-router";
import { reactive } from "vue";
import apiFetch from "@/api/api";
import { swalLoading, swalClose, swalAlert } from "@/entities/swal.entity";

const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
});

async function login() {
  try {
    swalLoading();
    const response = await apiFetch("/users/login", {
      method: "POST",
      body: {
        email: formData.email,
        password: formData.password,
      },
    });
    localStorage.setItem("token", response.token);
    swalClose();
    router.push("/");
  } catch (err) {
    swalAlert("error", err.data.message);
  }
}
</script>

<template>
  <div style="height: 100vh">
    <form
      class="d-flex flex-column justify-content-center align-items-center h-100"
      @submit.prevent="login"
    >
      <h3 class="mb-4">Login Simple ToDo List</h3>
      <input
        id="email"
        type="email"
        class="form-control w-25 mb-3"
        placeholder="name@example.com"
        v-model="formData.email"
      />
      <input
        id="password"
        type="password"
        class="form-control w-25 mb-2"
        placeholder="password"
        v-model="formData.password"
      />
      <small>
        <router-link to="/register"
          >Don't have an account? Register here</router-link
        >
      </small>
      <button type="submit" id="loginBtn" class="btn btn-primary mt-4">
        <b>LOGIN</b>
      </button>
    </form>
  </div>
</template>
