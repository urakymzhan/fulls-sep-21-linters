# Minimal linting in JavaScript

## LINTING

-   [ESLint](https://eslint.org/docs/user-guide/getting-started)
-   [Prettier](https://prettier.io/docs/en/install.html)
-   [Git hooks](https://github.com/typicode/husky)
-   [Husky](https://github.com/okonet/lint-staged)

## Steps:

1. To create a new npm project: `npm init -y`
2. Create entry point file: `touch index.js` write some bad formatted code.
3. Install eslint: `npm install eslint --save-dev`
4. Set up a configuration file for eslint: ` npx eslint --init`
5. `npx eslint --init` => choose from options
6. After that, you can run ESLint on any file or directory like this: `npx eslint index.js`
7. After running `eslint --init`, you'll have a `.eslintrc.{js,yml,json}` file in your directory.

Example

```js
{
    "rules": {
        "semi": [2, "always"], // 2 means error
        "quotes": ["error", "single",  { avoidEscape: true }],
        "no-var": "error",
        "prefer-const": "error",
    }
}
```
> The names "semi" and "quotes" are the names of rules in ESLint. The first value is the error level of the rule and can be one of these values:
>
> -   **"off" or 0** - turn the rule off <br/>
> -   **"warn" or 1** - turn the rule on as a warning (doesn't affect exit code) <br/>
> -   **"error" or 2** - turn the rule on as an error (exit code will be 1) <br/>

8. **OPTIONAL STEP** You can disable or enable on your files.

```js
/* eslint-disable*/
console.log('test');
/* eslint-enable */
// or in single line
console.log('test'); // eslint-disable-line
```

9. **OPTIONAL STEP**. Skip if you want use default eslint guide. You can also use famous [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

    - Install `npm install --save-dev eslint-config-airbnb`
    - Add below code in your `.eslintrc` file

    ```js
    {
    "extends": "airbnb",
    }
    ```

10. **OPTIONAL STEP** You can also create `.eslintignore` file in order to ignore some files from linting. For more read [here](https://eslint.org/docs/user-guide/configuring/ignoring-code#the-eslintignore-file)

Example:

```js
# Valid
/root/src/*.js

# Invalid
\root\src\*.js
```

11. [PRETTIER](https://prettier.io/): What do I need to get started with Prettier?

> ESLint performs automated scans of your JavaScript files for common syntax and style errors. Prettier scans your files for style issues and automatically reformats your code to ensure consistent rules are being followed for indentation, spacing, semicolons, single quotes vs double quotes, etc

12. Install prettier: `npm install -D prettier`

13. You can also setup rules in prettier: `touch .prettierrc`. Read more about config file in prettier [here](https://prettier.io/docs/en/configuration.html)

Basic configuration in JSON format:

```js
{
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": true,
  "singleQuote": true,
  "arrowParens": "avoid"
}
```

14. To exclude files from formatting, create a `.prettierignore` file in the root of your project. `.prettierignore` uses `gitignore syntax`.

Example

```js
# Ignore artifacts:
build
coverage

# Ignore all HTML files:
*.html
```

or ignore in JS files. See more how you can ignore in different formats [here](https://prettier.io/docs/en/ignore.html)

```js
// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)
```

15. At this point you might ask. What if eslint and prettier rules overlap each other?

-   In order to solve conflicts we will use `eslint-config-prettier` pre-made configs.
-   Install eslint-config-prettier: `npm install --save-dev eslint-config-prettier`
-   Then add `prettier` to your eslint "extends" array in your .eslintrc.\* file. Make sure to put it last, so it gets the chance to override other configs.

```js
{
  "extends": [
    "eslint:recommended",
    "prettier"
  ]
}
```

-   That’s it! Extending "prettier" turns off a bunch of core ESLint rules, as well as a few rules from these plugins:

```js
@typescript-eslint/eslint-plugin
@babel/eslint-plugin
eslint-plugin-babel
eslint-plugin-flowtype
eslint-plugin-react
eslint-plugin-standard
eslint-plugin-unicorn
eslint-plugin-vue
```

-   Read more [here](https://github.com/prettier/eslint-config-prettier)

16. Now its time to run some scripts to see in effect. In your `package.json` file add some scripts:

```js
    "scripts": {
        "prettier:check": "prettier --check .",
        "prettier:write": "prettier --write .",
        "lint:check": "eslint .",
        "lint:fix": "eslint --fix ."
    }
```

-   Now check `npm run prettier:check` or force formatting: `npm run prettier:write`
-   You can also lint your code: `npm run lint:check` or auto-fix errors with `npm run lint:fix`
-   If scripts doesn't work: do `npm install` and try again.

17. [GIT HOOKS](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) and [HUSKY](https://github.com/typicode/husky)

> A pre-commit hook is a Git feature that allows to run a command before doing a git commit. To set it up we will use the husky package. We will also use the lint-staged package, so that we only run ESLint and Prettier on files that will be committed. If you're working on a big project it would be too slow to run ESLint and Prettier over the whole codebase. [Ref](https://naruhodo.dev/setup-eslint-and-prettier-the-right-way/)

18. Install both packages: `npm install --save-dev husky lint-staged`

19. Then, to enable the git hooks, use the following command: `npx husky install`

20. Run the following as well to make sure that Husky will be automatically setup when installing the dependencies (so that your teammates won't have to do all this): `npm set-script prepare "husky install"`

21. And now let's create the pre-commit hook with the following command: `npx husky add .husky/pre-commit "npx lint-staged"`

Now, whenever you commit something, `npx lint-staged` will run before committing and if that command returns an error the commit will be cancelled

This is useful if your teammates don't want to setup ESLint and Prettier in their IDE, at least they will be required to run them manually in order to commit.

22. We still need to configure lint-staged. Open the **package.json** and add the following

```js
"lint-staged": {
    "**/*.{js}": [
      "eslint"
    ],
    "**/*.{js,json}": [
      "prettier --check"
    ],
  }
```

Right now this only targets **js** files. Make sure to target file extensions as well if required.

Now, when lint-staged is executed (automatically thanks to the pre-commit hook), it will run ESLint then Prettier for all the matching files that have been staged (about to be committed).

That's it, now you can focus on writing code and improving your code quality thanks to ESlint. You won't have to worry about formatting because Prettier will take care of it for you. [Ref](https://naruhodo.dev/setup-eslint-and-prettier-the-right-way/)

23. Don't forget to ignore **node_modules** in your `.gitignore` file.

-   Run `touch .gitignore` and `echo node_modules >> .gitignore`


