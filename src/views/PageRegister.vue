<script setup lang="ts">
import {
  NInput,
  NInputGroup,
  NButton,
  NIcon,
  NForm,
  NFormItem,
  NSpin,
  useMessage,
  type FormRules,
  type FormInst,
} from "naive-ui";
import { ref } from "vue";
import { Plus, Login } from "@vicons/tabler";
import { useRouter } from "vue-router";
import { useMutationRegister } from "@/apis/login";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const message = useMessage();
const userStore = useUserStore();
const { mutate, loading } = useMutationRegister({
  async onDone(result) {
    if (result) router.push({ name: "login" });
  },
});

// 登入表單
const formRef = ref<FormInst | null>(null);
const formValue = ref({
  username: "",
  name: "",
  code: "",
  password: "",
});
const rules: FormRules = {
  username: {
    required: true,
    trigger: ["input", "blur"],
  },
  name: {
    required: true,
    trigger: ["input", "blur"],
  },
  code: {
    required: true,
    trigger: ["input", "blur"],
  },
  password: {
    required: true,
    trigger: ["input", "blur"],
  },
};

const register = async () => {
  try {
    await formRef.value?.validate();
  } catch (err) {
    console.debug("login form validate failed:", err);
    message.error("請按照提示填寫");
    return;
  }
  const { username, name, code, password } = formValue.value;
  await mutate({
    input: { account: username, name, code, passwordInput: password },
  });
};

const jumpTo = (name: string) => {
  router.push({ name });
};
</script>
<template>
  <section class="h-full w-full grid">
    <div class="login-box">
      <NForm
        ref="formRef"
        :model="formValue"
        :show-label="false"
        :show-feedback="false"
        :rules="rules"
        class="grid auto-rows-min grid-gap-4"
      >
        <NFormItem path="username">
          <NInput
            v-model:value="formValue.username"
            size="large"
            placeholder="帳號"
          >
            <template #prefix> > </template>
          </NInput>
        </NFormItem>
        <NFormItem path="name">
          <NInput
            v-model:value="formValue.name"
            size="large"
            placeholder="名稱"
          >
            <template #prefix> > </template>
          </NInput>
        </NFormItem>
        <NFormItem path="code">
          <NInput
            v-model:value="formValue.code"
            size="large"
            placeholder="邀請碼"
          >
            <template #prefix> > </template>
          </NInput>
        </NFormItem>
        <NFormItem path="password">
          <NInputGroup>
            <NInput
              v-model:value="formValue.password"
              type="password"
              show-password-on="mousedown"
              size="large"
              placeholder="密碼"
              class="mr-4"
              @keyup.enter="register"
            >
              <template #prefix> > </template>
            </NInput>
            <NButton
              text
              type="success"
              size="large"
              class="mr-2"
              @click="register"
            >
              <template #icon>
                <NSpin v-if="loading" :size="'small'"></NSpin>
                <NIcon v-else><Plus></Plus></NIcon>
              </template>
            </NButton>
            <NButton
              text
              type="success"
              size="large"
              @click="() => jumpTo('login')"
            >
              <template #icon>
                <NSpin v-if="loading" :size="'small'"></NSpin>
                <NIcon v-else><Login></Login></NIcon>
              </template>
            </NButton>
          </NInputGroup>
        </NFormItem>
      </NForm>
    </div>
  </section>
</template>
