import {
  each,
  mapValues,
} from 'lodash';

const defaultOptions = {
  localName: 'local',
};
const defaultFormatter = (value) => value

export default (props, options = defaultOptions) => {
  const propsDefinitions = mapValues(props, ({ ...prop, formatter }) => ({
    ...prop,
  }))
  return {
    props: propsDefinitions,
    data() {
      return {
        [options.localName]: {
          ...mapValues(props, ({ formatter = defaultFormatter }, propName) => formatter(this[propName])),
        },
      };
    },
    created() {
      each(props, ({ formatter = defaultFormatter }, propName) => {
        this.$watch(propName, (value) => {
          this[options.localName][propName] = formatter(value);
        });
      });
    },
  }
};
