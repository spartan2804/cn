<!-- src/components/TestcaseManager.vue -->
<template>
  <div>
    <input v-model="searchQuery" placeholder="Search Testcases" />
    <ul>
      <li v-for="testcase in filteredTestcases" :key="testcase.tc_id">
        {{ testcase.tc_name }}
        <button @click="editTestcase(testcase)">Edit</button>
        <button @click="deleteTestcase(testcase.tc_id)">Delete</button>
      </li>
    </ul>
    <form @submit.prevent="submitForm">
      <input v-model="form.tc_name" placeholder="Testcase Name" required />
      <textarea v-model="form.description" placeholder="Description"></textarea>
      <button type="submit">{{ form.tc_id ? 'Update' : 'Create' }} Testcase</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useTestcase } from '@/composables/useTestcase';

const props = defineProps({
  featureId: {
    type: String,
    required: true,
  },
});

const { testcases, loadTestcases, createTestcase, updateTestcase, deleteTestcaseById } = useTestcase();
const searchQuery = ref('');
const form = ref({
  tc_id: null,
  tc_name: '',
  description: '',
});

const filteredTestcases = computed(() =>
  testcases.value.filter((tc) => tc.tc_name.toLowerCase().includes(searchQuery.value.toLowerCase()))
);

const editTestcase = (testcase) => {
  form.value = { ...testcase };
};

const deleteTestcase = async (tc_id) => {
  await deleteTestcaseById(tc_id);
  await loadTestcases(props.featureId);
};

const submitForm = async () => {
  if (form.value.tc_id) {
    await updateTestcase(form.value.tc_id, form.value);
  } else {
    await createTestcase(props.featureId, form.value);
  }
  form.value = { tc_id: null, tc_name: '', description: '' };
  await loadTestcases(props.featureId);
};

watch(
  () => props.featureId,
  async (newFeatureId) => {
    if (newFeatureId) {
      await loadTestcases(newFeatureId);
    }
  },
  { immediate: true }
);
</script>
