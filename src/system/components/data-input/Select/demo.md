## Basic usage

```
<ds-select :options="['blue', 'red', 'green']" />
```

## Usage with label

```
<ds-select
  label="Color"
  :options="['blue', 'red', 'green']" />
```

## Bind to a value

Use v-model to bind a value to the select input.

```
<template>
  <div>
    <ds-select
      v-model="color"
      :options="['blue', 'red', 'green']"
      placeholder="Color ..."></ds-select>
    <ds-text>Your color: {{ color }}</ds-text>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        color: ''
      }
    }
  }
</script>
```

## Validation

We use <a href="https://github.com/yiminghe/async-validator" targe="_blank">async-validator schemas</a> for validation.

If you need to validate more than one field it is better to use the form component.

```
<template>
  <div>
    <ds-select
      v-model="color"
      :options="['blue', 'red', 'green']"
      :schema="{type: 'enum', enum: ['green'], message: 'Please choose green :)' }"
      placeholder="Color ..." />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        color: ''
      }
    }
  }
</script>
```

## Select sizes

```
<ds-select placeholder="Small ..." size="small"></ds-select>
<ds-select placeholder="Base ..."></ds-select>
<ds-select placeholder="Large ..." size="large"></ds-select>
```

## Select icons

Add an icon to help the user identify the select fields usage.

```
<ds-select
  placeholder="User ..."
  icon="user"></ds-select>
<ds-select
  placeholder="Day ..."
  icon="clock"></ds-select>
<ds-select
  placeholder="User ..."
  size="small"
  icon="user"></ds-select>
<ds-select
  placeholder="User ..."
  size="large"
  icon="user"></ds-select>
```