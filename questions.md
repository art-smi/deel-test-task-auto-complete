# Questions

## 1. What is the difference between Component and PureComponent? give an example where it might break my app

Answer: In general, React.Component and React.PureComponent is almost the same. Difference only in shouldComponentUpdate() which uses by default in PureComponent. You can also use shouldComponentUpdate in React.Component, but it's not used by default. I'm not sure about breaking the app, but you can have problems with objects in props/state, because PureComponent uses shallow comparing and checks only values and refs to objects.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Answer: Maybe because ShouldComponentUpdate can block updates context data in child components? I don't know if be honest. Didn't used ShouldComponentUpdate/React.PureComponent at least for 2 years 😀

## 3. Describe 3 ways to pass information from a component to its PARENT

Answer:

1. Context with setter function
2. Pass setState to a child or Callback with value in argument 🤪
3. Forwarding ref
4. Bonus: Redux or any other state manager

## 4. Give 2 ways to prevent components from re-rendering

Answer:

1. For functional components we can use wrapper with HOC React.memo() `React.memo((props) => <div>{props.something}</div>)`
2. For class components we can use React.PureComponent or React.Component with custom shouldComponentUpdate checks

## 5. What is a fragment and why do we need it? Give an example where it might break my app

Answer: React.Fragment is virtual wrapper for your components. Most use case: when you need two+ elements in a component, but you don't need(or you can't) to add an additional dom-element, you can use <></> or React.Fragment. Or it can be used for the passing ref for a group of components without a parent.
I don't remember situations, when React.Fragment can break the app.

## 6. Give 3 examples of the HOC pattern

Answer:

1. React.memo for memoizing results, sometimes it can add some boost and prevent re-renders
2. Previously Redux and react-router used HOCs for connecting with their data and callbacks.
3. My example of using HOC. Here we are adding a wrapper with ContextProvider to the Component and we can reuse it for easily giving contexts to other components:

```typescript
import { ComponentType } from 'react';

export const withContext = <TProviderProps, TComponentProps>(
  Component: ComponentType<TComponentProps>,
  Provider: ComponentType<TProviderProps>,
  providerProps: TProviderProps,
) => {
  return (props: TComponentProps): JSX.Element => (
    <Provider {...providerProps}>
      <Component {...props} />
    </Provider>
  );
};
```

And using: `withContext(Page, Provider, {});`

## 7. what's the difference in handling exceptions in promises, callbacks and async...await

Answer:

1. In promises we have a reject function that should be processed by the developer.
2. In callbacks we can use try-catch for handling exceptions.
3. In async...await it's based on what is used inside async...await function. It can be a promise or some async callback

## 8. How many arguments does setState take and why is it async

Answer: setState has two arguments: first – the new state(*), the seconds its function which will be run after changing the state.
*You can also pass function like this: (oldState) => {} instead of the new state, for getting the latest state and modify him.
Async because React waits for all calls setState and you can get an old state in another place for preventing re-renders. If re-render not was fired and you need the latest real state you can use setState with function in the first argument, as I showed above.

## 9. List the steps needed to migrate a Class to Function Component

Answer:

1. Replace class components with functions
2. Remove the constructor with moving state to useState hook
3. Replace life-cycles with useEffect
4. Remove render() method
5. Change methods to functions and remove `this` context
6. If it possible: replace HOCs with hooks, it will be more code friendly

## 10. List a few ways styles can be used with components

Answer:

- CSS-in-JS: styled-components, emotion, etc
- Plain css without additional loaders (just import styles in HTML document and access by class name)
- With loaders in bundler: css modules or any pre-processors like SASS/Stylus/etc
- Plain style object in an element 🤪

## 11. How to render an HTML string coming from the server

Answer: you can use the attribute `dangerouslySetInnerHTML={ __html: html }` for the parent element, it will appear your html from the server in children. But it's not safe.
Also, you can use some 3rd libraries which parse provided HTML and show it by escaping some symbols.
