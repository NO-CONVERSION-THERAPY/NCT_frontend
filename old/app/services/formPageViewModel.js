const { getAreaOptions } = require('../../config/areaSelector');
const {
  getLocalizedAgentRelationshipOptions,
  getLocalizedExitMethodOptions,
  getLocalizedFormRules,
  getLocalizedIdentityOptions,
  getLocalizedLegalAidOptions,
  getLocalizedOtherSexTypeOptions,
  getLocalizedParentMotivationOptions,
  getLocalizedSexOptions,
  getLocalizedViolenceCategoryOptions
} = require('../../config/formConfig');
const { sensitiveRobotsPolicy } = require('../../config/security');
const { issueFormProtectionToken } = require('./formProtectionService');

function buildFormPageViewModel({ apiUrl, formProtectionSecret, req, title: pageTitle }) {
  const t = req.t;
  const { provinces } = getAreaOptions(req.lang);

  return {
    title: pageTitle || t('pageTitles.form', { title: req.t('common.siteName') }),
    apiUrl,
    areaOptions: { provinces },
    formProtectionToken: issueFormProtectionToken({ secret: formProtectionSecret }),
    agentRelationshipOptions: getLocalizedAgentRelationshipOptions(t),
    exitMethodOptions: getLocalizedExitMethodOptions(t),
    formRules: getLocalizedFormRules(t),
    identityOptions: getLocalizedIdentityOptions(t),
    legalAidOptions: getLocalizedLegalAidOptions(t),
    otherSexTypeOptions: getLocalizedOtherSexTypeOptions(t),
    parentMotivationOptions: getLocalizedParentMotivationOptions(t),
    pageRobots: sensitiveRobotsPolicy,
    sexOptions: getLocalizedSexOptions(t),
    violenceCategoryOptions: getLocalizedViolenceCategoryOptions(t)
  };
}

module.exports = {
  buildFormPageViewModel
};
