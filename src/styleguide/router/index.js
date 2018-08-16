import Vue from 'vue'
import VueRouter from 'vue-router'
import { kebabCase } from 'lodash'

import createUrl from '@@/utils/create-url'
import { componentsMap } from '@@/system/components'
import config from '../config'
import PageWrapper from '../components/PageWrapper'
import SectionPage from '../components/SectionPage'
import ComponentPage from '../components/ComponentPage'

Vue.use(VueRouter)

function createRoute(section) {
  const components = componentsMap[kebabCase(section.name)]
  const filteredComponents = components
    ? components.filter(c => !c.parent)
    : null

  const route = {
    path: section.path ? section.path : createUrl(section.name),
    component: createPageWrapper(section, filteredComponents),
    children: [
      {
        path: '',
        name: section.name,
        component: createSectionPage(section, filteredComponents)
      }
    ]
  }
  if (filteredComponents) {
    route.children = route.children.concat(
      filteredComponents.map(createComponentRoute)
    )
  }
  return route
}

function createPageWrapper(section, components) {
  return {
    render: h =>
      h(PageWrapper, {
        props: {
          section: section,
          components: components
        }
      })
  }
}

function createSectionPage(section, components) {
  return {
    render: h =>
      h(SectionPage, {
        props: {
          section: section,
          components: components
        }
      })
  }
}

function createComponentRoute(component) {
  return {
    path: createUrl(component.name, false),
    name: component.name,
    component: createComponentPage(component)
  }
}

function createComponentPage(component) {
  return {
    render: h =>
      h(ComponentPage, {
        props: {
          component: component
        }
      })
  }
}

const routes = config.sections.map(createRoute)

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
