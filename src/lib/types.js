/**
 * @typedef {Object} TStep
 * @property {string} title - The title of the step.
 * @property {function(ctx: TStepContext): number} next - The age of the person.
 * @property {number} previous - The age of the person.
 * @property {string} description - The age of the person.
 * @property {string} id - The age of the person.
 * @property {TStepContext} conditions - The age of the person.
 */

/**
 * @typedef {Object} TStepContext
 * @property {Object} anzahl_kinder
 * @property {number} anzahl_kinder.erwachsene
 * @property {number} anzahl_kinder.jugendliche
 * @property {number} anzahl_kinder.kinder
 * @property {number} anzahl_kinder.kleinkinder
 * @property {Object} ausgaben
 * @property {number} ausgaben.heizkosten
 * @property {number} ausgaben.kaltmiete
 * @property {number} ausgaben.nebenkosten
 * @property {Object} einkommen
 * @property {number} einkommen.arbeitslosengeld
 * @property {number} einkommen.brutto
 * @property {number} einkommen.elterngeld
 * @property {number} einkommen.kindergeld
 * @property {number} einkommen.netto
 * @property {number} einkommen.rente
 * @property {number} einkommen.sonstiges
 * @property {('toddler' | 'child' | 'teenager' | 'adult')[]} kinder
 * @property {boolean} partnerschaft
 * @property {boolean} schwanger
 */

/**
 * @typedef {Object} TStepsConfig
 * @property {TStepContext} context
 * @property {number} currentStep
 * @property {Object.<number, TStep>} steps
 */

/**
 * @typedef {Object} TAction
 * @property {"next" | "previous"} type
 * @property {TStepContext} [data]
 */


export { }