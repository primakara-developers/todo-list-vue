<script setup>
import { RouterLink, useRouter } from "vue-router";
import { reactive } from "vue";
import apiFetch from "@/api/api";
import { swalLoading, swalClose, swalAlert } from "@/entities/swal.entity";

const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

async function register() {
  if (formData.password === formData.confirmPassword) {
    try {
      swalLoading();
      const response = await apiFetch("/users/register", {
        method: "POST",
        body: {
          email: formData.email,
          password: formData.password,
        },
      });
      swalClose();
      router.push("/login");
    } catch (err) {
      swalAlert("error", err.data.message);
    }
  } else {
    swalAlert("warning", "Password doesnt match!");
  }
}
</script>

<template>
  <div style="height: 100vh">
    <form
      class="d-flex flex-column justify-content-center align-items-center h-100"
      @submit.prevent="register"
    >
      <h3 class="mb-4">Register Simple ToDo List</h3>
      <input
        id="register_email"
        type="email"
        class="form-control w-25 mb-3"
        placeholder="name@example.com"
        v-model="formData.email"
      />
      <input
        id="register_password"
        type="password"
        class="form-control w-25 mb-3"
        placeholder="password"
        v-model="formData.password"
      />
      <input
        id="confirm_register_password"
        type="password"
        class="form-control w-25 mb-2"
        placeholder="confirm password"
        v-model="formData.confirmPassword"
      />
      <small>
        <router-link to="/login"
          >Already have an account? Login here</router-link
        >
      </small>
      <button id="registerBtn" type="submit" class="btn btn-secondary mt-4">
        <b>REGISTER</b>
      </button>
    </form>
  </div>
</template>
