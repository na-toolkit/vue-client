<script setup lang="ts">
import {
  NInput,
  NInputGroup,
  NForm,
  NFormItem,
  useMessage,
  type FormRules,
  type FormInst,
} from "naive-ui";
import { ref } from "vue";
import { Plus, Login } from "@vicons/tabler";
import { useRouter } from "vue-router";
import { useMutateLogin } from "@/apis/login";
import { useUserStore } from "@/stores/user";
import ButtonIcon from "@/components/ButtonIcon.vue";
import { routeNameJumpTo } from "@/utils/routeJumpTo";

const router = useRouter();
const jumpTo = routeNameJumpTo(router);
const message = useMessage();
const userStore = useUserStore();
const { mutate, loading } = useMutateLogin({
  async onDone(result) {
    const { accessToken, expiresIn: expiredAt } = result;
    await userStore.actionLoginSuccess({ accessToken, expiredAt });
    jumpTo("Dashboard");
  },
});

// 登入表單
const formRef = ref<FormInst | null>(null);
const formValue = ref({
  // FIXME:
  username: "naremloa",
  // username: "",
  password: "",
});
const rules: FormRules = {
  username: {
    required: true,
    trigger: ["input", "blur"],
  },
  password: {
    required: true,
    trigger: ["input", "blur"],
  },
};

const login = async () => {
  try {
    await formRef.value?.validate();
  } catch (err) {
    console.debug("login form validate failed:", err);
    message.error("請按照提示填寫");
    return;
  }
  const { username, password } = formValue.value;
  await mutate({
    input: { account: username, passwordInput: password },
  });
};
</script>
<template>
  <section class="grid h-full w-full">
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
        <NFormItem path="password">
          <NInputGroup class="justify-around gap-2">
            <NInput
              v-model:value="formValue.password"
              type="password"
              show-password-on="click"
              size="large"
              placeholder="密碼"
              @keyup.enter="login"
            >
              <template #prefix> > </template>
            </NInput>
            <ButtonIcon :loading="loading" @click="login">
              <Login></Login>
            </ButtonIcon>
            <ButtonIcon @click="() => jumpTo('Register')">
              <Plus></Plus
            ></ButtonIcon>
          </NInputGroup>
        </NFormItem>
      </NForm>
    </div>
  </section>
</template>
