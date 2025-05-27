<!-- src/views/AddTestcase.vue -->
<template>
  <div>
    <ProductDropdown @update:selectedProduct="onProductSelect" />
    <TeamDropdown :productId="selectedProduct" @update:selectedTeam="onTeamSelect" />
    <GroupDropdown :teamId="selectedTeam" @update:selectedGroup="onGroupSelect" />
    <ModuleDropdown :groupId="selectedGroup" @update:selectedModule="onModuleSelect" />
    <FeatureDropdown :moduleId="selectedModule" @update:selectedFeature="onFeatureSelect" />
    <TestcaseManager v-if="selectedFeature" :featureId="selectedFeature" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductDropdown from '@/components/Dropdowns/ProductDropdown.vue';
import TeamDropdown from '@/components/Dropdowns/TeamDropdown.vue';
import GroupDropdown from '@/components/Dropdowns/GroupDropdown.vue';
import ModuleDropdown from '@/components/Dropdowns/ModuleDropdown.vue';
import FeatureDropdown from '@/components/Dropdowns/FeatureDropdown.vue';
import TestcaseManager from '@/components/TestcaseManager.vue';

const selectedProduct = ref(null);
const selectedTeam = ref(null);
const selectedGroup = ref(null);
const selectedModule = ref(null);
const selectedFeature = ref(null);

const onProductSelect = (id) => {
  selectedProduct.value = id;
  selectedTeam.value = null;
  selectedGroup.value = null;
  selectedModule.value = null;
  selectedFeature.value = null;
};

const onTeamSelect = (id) => {
  selectedTeam.value = id;
  selectedGroup.value = null;
  selectedModule.value = null;
  selectedFeature.value = null;
};

const onGroupSelect = (id) => {
  selectedGroup.value = id;
  selectedModule.value = null;
  selectedFeature.value = null;
};

const onModuleSelect = (id) => {
  selectedModule.value = id;
  selectedFeature.value = null;
};

const onFeatureSelect = (id) => {
  selectedFeature.value = id;
};
</script>
