// 表單枚举值、长度规则和地区联动数据都集中在这里，前后端共用一套定义。
const SELF_IDENTITY = '受害者本人';
const AGENT_IDENTITY = '受害者的代理人';
const OTHER_SEX_OPTION = '__other_option__';
const CUSTOM_OTHER_SEX_OPTION = '__custom_other_sex__';
const CUSTOM_AGENT_RELATIONSHIP_OPTION = '__custom_agent_relationship__';
const CUSTOM_PARENT_MOTIVATION_OPTION = '__custom_parent_motivation__';
const CUSTOM_VIOLENCE_CATEGORY_OPTION = '__custom_violence_category__';
const CUSTOM_EXIT_METHOD_OPTION = '__custom_exit_method__';
const CUSTOM_LEGAL_AID_OPTION = '__custom_legal_aid__';
const allowedIdentities = new Set([SELF_IDENTITY, AGENT_IDENTITY]);
const allowedSexes = new Set(['女性', '男性', OTHER_SEX_OPTION]);
const otherSexTypeOptions = [
  { value: 'MtF', labelKey: 'form.sexIdentityOptions.mtf' },
  { value: 'FtM', labelKey: 'form.sexIdentityOptions.ftm' },
  { value: 'X', labelKey: 'form.sexIdentityOptions.x' },
  { value: 'Queer', labelKey: 'form.sexIdentityOptions.queer' }
];
const allowedOtherSexTypes = new Set([
  ...otherSexTypeOptions.map((option) => option.value),
  CUSTOM_OTHER_SEX_OPTION
]);
const identityOptions = [
  { value: SELF_IDENTITY, labelKey: 'form.identityOptions.self' },
  { value: AGENT_IDENTITY, labelKey: 'form.identityOptions.agent' }
];
const sexOptions = [
  { value: '女性', labelKey: 'form.sexOptions.female' },
  { value: '男性', labelKey: 'form.sexOptions.male' },
  { value: OTHER_SEX_OPTION, labelKey: 'form.sexOptions.other' }
];
const agentRelationshipOptions = [
  { value: '朋友', labelKey: 'form.agentRelationshipOptions.friend' },
  { value: '伴侣', labelKey: 'form.agentRelationshipOptions.partner' },
  { value: '亲属', labelKey: 'form.agentRelationshipOptions.family' },
  { value: '救助工作者', labelKey: 'form.agentRelationshipOptions.supportWorker' },
  { value: CUSTOM_AGENT_RELATIONSHIP_OPTION, labelKey: 'form.agentRelationshipOptions.other' }
];
const parentMotivationOptions = [
  { value: '"网瘾"/游戏沉迷', labelKey: 'form.parentMotivationOptions.internetAddiction' },
  { value: '"厌学"/学业问题', labelKey: 'form.parentMotivationOptions.studyIssues' },
  { value: '"叛逆"/行为管教', labelKey: 'form.parentMotivationOptions.behaviorControl' },
  { value: '精神或心理健康相关问题', labelKey: 'form.parentMotivationOptions.mentalHealth' },
  { value: '性别认同相关（如跨性别等）', labelKey: 'form.parentMotivationOptions.genderIdentity' },
  { value: '性取向相关（如同性恋、双性恋等）', labelKey: 'form.parentMotivationOptions.sexualOrientation' },
  { value: '家庭冲突中的恶意施暴或惩罚手段', labelKey: 'form.parentMotivationOptions.familyViolence' },
  { value: '咨询师/医生/老师等人士建议', labelKey: 'form.parentMotivationOptions.professionalAdvice' },
  { value: '亲属或身边人建议', labelKey: 'form.parentMotivationOptions.relativesAdvice' },
  { value: '网络广告或机构宣传误导', labelKey: 'form.parentMotivationOptions.advertising' },
  { value: '不清楚/从未被告知原因', labelKey: 'form.parentMotivationOptions.unknown' },
  { value: CUSTOM_PARENT_MOTIVATION_OPTION, labelKey: 'form.parentMotivationOptions.other' }
];
const violenceCategoryOptions = [
  { value: '虚假/非法宣传', labelKey: 'form.violenceCategoryOptions.falsePromotion' },
  { value: '冒充警察绑架', labelKey: 'form.violenceCategoryOptions.fakePolice' },
  { value: '直接接触的肢体暴力（如扇耳光等）', labelKey: 'form.violenceCategoryOptions.directPhysical' },
  { value: '使用工具的肢体暴力（如棍棒殴打、电击等）', labelKey: 'form.violenceCategoryOptions.toolPhysical' },
  { value: '体罚（如长跑等）', labelKey: 'form.violenceCategoryOptions.corporalPunishment' },
  { value: '限制自由（如捆绑等）', labelKey: 'form.violenceCategoryOptions.restriction' },
  { value: '辱骂或公开羞辱', labelKey: 'form.violenceCategoryOptions.humiliation' },
  { value: '言语的性暴力（如性羞辱等）', labelKey: 'form.violenceCategoryOptions.verbalSexual' },
  { value: '肢体的性暴力（如性侵犯等）', labelKey: 'form.violenceCategoryOptions.physicalSexual' },
  { value: '关禁闭', labelKey: 'form.violenceCategoryOptions.solitary' },
  { value: '饮食限制或不健康饮食', labelKey: 'form.violenceCategoryOptions.foodRestriction' },
  { value: '睡眠剥夺', labelKey: 'form.violenceCategoryOptions.sleepDeprivation' },
  { value: '强迫服用药物', labelKey: 'form.violenceCategoryOptions.forcedMedication' },
  { value: '性别扭转（如强迫改变外表等）', labelKey: 'form.violenceCategoryOptions.genderConversion' },
  { value: '精神控制或洗脑', labelKey: 'form.violenceCategoryOptions.brainwashing' },
  { value: CUSTOM_VIOLENCE_CATEGORY_OPTION, labelKey: 'form.violenceCategoryOptions.other' }
];
const exitMethodOptions = [
  { value: '到期后家长接回', labelKey: 'form.exitMethodOptions.pickedUp' },
  { value: '自行逃离', labelKey: 'form.exitMethodOptions.escape' },
  { value: '被强制转学', labelKey: 'form.exitMethodOptions.transfer' },
  { value: '被解救', labelKey: 'form.exitMethodOptions.rescued' },
  { value: '机构关闭', labelKey: 'form.exitMethodOptions.closed' },
  { value: CUSTOM_EXIT_METHOD_OPTION, labelKey: 'form.exitMethodOptions.other' }
];
const legalAidOptions = [
  { value: '是', labelKey: 'form.legalAidOptions.yes' },
  { value: '否', labelKey: 'form.legalAidOptions.no' },
  { value: '想但不知道途径', labelKey: 'form.legalAidOptions.unsureHow' },
  { value: '担心报复', labelKey: 'form.legalAidOptions.fearRetaliation' },
  { value: CUSTOM_LEGAL_AID_OPTION, labelKey: 'form.legalAidOptions.other' }
];
const allowedAgentRelationshipOptions = new Set(agentRelationshipOptions.map((option) => option.value));
const allowedParentMotivationOptions = new Set(parentMotivationOptions.map((option) => option.value));
const allowedViolenceCategoryOptions = new Set(violenceCategoryOptions.map((option) => option.value));
const allowedExitMethodOptions = new Set(exitMethodOptions.map((option) => option.value));
const allowedLegalAidOptions = new Set(legalAidOptions.map((option) => option.value));

function isAgentIdentity(identity) {
  return identity === AGENT_IDENTITY;
}

function getBirthYearLabelKey(identity) {
  return isAgentIdentity(identity) ? 'fields.victimBirthYear' : 'fields.birthYear';
}

function getSexLabelKey(identity) {
  return isAgentIdentity(identity) ? 'fields.victimSex' : 'fields.sex';
}

function getFormRuleDefinitions(now = new Date()) {
  const currentYear = now.getUTCFullYear();

  return {
    birthDate: { labelKey: 'fields.birthDate', required: true },
    // Worker 可能跨年持续复用同一模块实例，所以年份上限要按调用时动态计算。
    birthYear: { labelKey: 'fields.birthYear', required: true, min: 1900, max: currentYear },
    birthMonth: { labelKey: 'fields.birthMonth', required: true, min: 1, max: 12 },
    birthDay: { labelKey: 'fields.birthDay', required: true, min: 1, max: 31 },
    identity: { labelKey: 'fields.identity', required: true },
    sex: { labelKey: 'fields.sex', required: true },
    sexOther: { labelKey: 'fields.sexOther', maxLength: 30 },
    provinceCode: { labelKey: 'fields.provinceCode', required: true },
    cityCode: { labelKey: 'fields.cityCode', required: true },
    countyCode: { labelKey: 'fields.countyCode', required: false },
    agentRelationship: { labelKey: 'fields.agentRelationship', maxLength: 30 },
    preInstitutionProvinceCode: { labelKey: 'fields.preInstitutionProvinceCode', required: false },
    preInstitutionCityCode: { labelKey: 'fields.preInstitutionCityCode', required: false },
    parentMotivations: { labelKey: 'fields.parentMotivations', required: false },
    parentMotivationOther: { labelKey: 'fields.parentMotivationOther', maxLength: 120 },
    schoolName: { labelKey: 'fields.schoolName', required: true, maxLength: 20 },
    schoolAddress: { labelKey: 'fields.schoolAddress', maxLength: 50 },
    dateStart: { labelKey: 'fields.dateStart', required: true },
    dateEnd: { labelKey: 'fields.dateEnd' },
    exitMethod: { labelKey: 'fields.exitMethod', required: false },
    exitMethodOther: { labelKey: 'fields.exitMethodOther', maxLength: 120 },
    experience: { labelKey: 'fields.experience', maxLength: 8000 },
    headmasterName: { labelKey: 'fields.headmasterName', maxLength: 10 },
    abuserInfo: { labelKey: 'fields.abuserInfo', maxLength: 600 },
    contactInformation: { labelKey: 'fields.contactInformation', required: true, maxLength: 30 },
    violenceCategories: { labelKey: 'fields.violenceCategories', required: false },
    violenceCategoryOther: { labelKey: 'fields.violenceCategoryOther', maxLength: 120 },
    scandal: { labelKey: 'fields.scandal', maxLength: 3000 },
    legalAidStatus: { labelKey: 'fields.legalAidStatus', required: false },
    legalAidOther: { labelKey: 'fields.legalAidOther', maxLength: 120 },
    other: { labelKey: 'fields.other', maxLength: 3000 }
  };
}

function getLocalizedFormRules(t, now = new Date()) {
  const formRuleDefinitions = getFormRuleDefinitions(now);

  // 后端校验和前端提示共用同一份 rule 定义，只在这里注入本地化 label。
  return Object.fromEntries(
    Object.entries(formRuleDefinitions).map(([field, definition]) => [
      field,
      {
        ...definition,
        label: t(definition.labelKey)
      }
    ])
  );
}

function getLocalizedIdentityOptions(t) {
  return identityOptions.map((option) => ({
    value: option.value,
    label: t(option.labelKey)
  }));
}

function getLocalizedSexOptions(t) {
  return sexOptions.map((option) => ({
    value: option.value,
    label: t(option.labelKey)
  }));
}

function getLocalizedOtherSexTypeOptions(t) {
  return otherSexTypeOptions.map((option) => ({
    value: option.value,
    label: t(option.labelKey)
  }));
}

function localizeOptions(options, t) {
  return options.map((option) => ({
    value: option.value,
    label: t(option.labelKey)
  }));
}

function getLocalizedAgentRelationshipOptions(t) {
  return localizeOptions(agentRelationshipOptions, t);
}

function getLocalizedParentMotivationOptions(t) {
  return localizeOptions(parentMotivationOptions, t);
}

function getLocalizedViolenceCategoryOptions(t) {
  return localizeOptions(violenceCategoryOptions, t);
}

function getLocalizedExitMethodOptions(t) {
  return localizeOptions(exitMethodOptions, t);
}

function getLocalizedLegalAidOptions(t) {
  return localizeOptions(legalAidOptions, t);
}

module.exports = {
  AGENT_IDENTITY,
  CUSTOM_AGENT_RELATIONSHIP_OPTION,
  CUSTOM_EXIT_METHOD_OPTION,
  CUSTOM_LEGAL_AID_OPTION,
  CUSTOM_OTHER_SEX_OPTION,
  CUSTOM_PARENT_MOTIVATION_OPTION,
  CUSTOM_VIOLENCE_CATEGORY_OPTION,
  OTHER_SEX_OPTION,
  SELF_IDENTITY,
  agentRelationshipOptions,
  allowedAgentRelationshipOptions,
  allowedIdentities,
  allowedExitMethodOptions,
  allowedLegalAidOptions,
  allowedOtherSexTypes,
  allowedParentMotivationOptions,
  allowedSexes,
  allowedViolenceCategoryOptions,
  exitMethodOptions,
  getBirthYearLabelKey,
  getLocalizedAgentRelationshipOptions,
  getLocalizedExitMethodOptions,
  getFormRuleDefinitions,
  getLocalizedFormRules,
  getLocalizedIdentityOptions,
  getLocalizedLegalAidOptions,
  getLocalizedOtherSexTypeOptions,
  getLocalizedParentMotivationOptions,
  getLocalizedSexOptions,
  getLocalizedViolenceCategoryOptions,
  getSexLabelKey,
  identityOptions,
  isAgentIdentity,
  legalAidOptions,
  otherSexTypeOptions,
  parentMotivationOptions,
  sexOptions,
  violenceCategoryOptions
};
