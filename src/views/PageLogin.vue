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
import { ArrowBigRightLine } from "@vicons/tabler";
import { useMutateLogin } from "../apis/login";

const { mutateLogin, loading } = useMutateLogin();
const message = useMessage();

const formRef = ref<FormInst | null>(null);
const formValue = ref({
  username: "",
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
    console.debug(err);
    return;
  }
  const [error, data] = await mutateLogin(formValue.value);
  if (!error) {
    message.success(JSON.stringify(data));
  } else {
    console.log("error", error);
    message.error(JSON.stringify(error));
  }
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
        <NFormItem path="password">
          <NInputGroup>
            <NInput
              v-model:value="formValue.password"
              type="password"
              show-password-on="mousedown"
              size="large"
              placeholder="密碼"
              class="mr-4"
            >
              <template #prefix> > </template>
            </NInput>
            <NButton text type="success" size="large" @click="login">
              <template #icon>
                <NSpin v-if="loading" :size="'small'"></NSpin>
                <NIcon v-else><ArrowBigRightLine></ArrowBigRightLine></NIcon>
              </template>
            </NButton>
          </NInputGroup>
        </NFormItem>
      </NForm>
    </div>
  </section>
</template>
