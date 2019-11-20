## [1.9.1](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.9.0...v1.9.1) (2019-11-20)


### 🐛 Bug Fixes

* uncomment essential line in awaiting human input to clear nulls ([4ad136e](https://github.com/wmfs/tymly-cardscript-plugin/commit/4ad136e5049028bc962ac534abaa2c612a440a94))

# [1.9.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.8.0...v1.9.0) (2019-11-15)


### ✨ Features

* Pass through uiRefresh resource config ([84ce0fa](https://github.com/wmfs/tymly-cardscript-plugin/commit/84ce0fa971066d8555a39f2f67819936bbbebd72))
* Support for uiType === 'info' ([79359be](https://github.com/wmfs/tymly-cardscript-plugin/commit/79359be2490f4288bdc4aa6753babd01b50de337))


### 🐛 Bug Fixes

* Pass uiType in requiredHumanInput ([d742be3](https://github.com/wmfs/tymly-cardscript-plugin/commit/d742be381fcbd005641062e26d02a280718c57a1))


### 📦 Code Refactoring

* Pull out board processing into its own function ([c3b9595](https://github.com/wmfs/tymly-cardscript-plugin/commit/c3b9595de8ed42bdc5be1c166d03da796e7243c2))
* remove uiType from awaiting human input ([dd995a3](https://github.com/wmfs/tymly-cardscript-plugin/commit/dd995a31847f6c5df43529fb77a5a76238014b2c))


### ♻️ Chores

* Bump tymly, tymly-pg-plugin, and tymly-solr-plugin dependencies ([abe296b](https://github.com/wmfs/tymly-cardscript-plugin/commit/abe296ba687d85858295753307a322cb152db227))

# [1.8.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.7.0...v1.8.0) (2019-11-07)


### 🐛 Bug Fixes

* refactor awaiting human input to no longer use ui type ([22502ea](https://github.com/wmfs/tymly-cardscript-plugin/commit/22502eabbd9471baab69d99e3582d395006df5c1))
* remove console logs ([8516911](https://github.com/wmfs/tymly-cardscript-plugin/commit/851691103bbcd27f4a7aba4df0b4a61fbd3c5104))
* remove forms + boards services ([21b2b07](https://github.com/wmfs/tymly-cardscript-plugin/commit/21b2b07e3de746036243728d7a85ba2343316697))
* remove get board data (it's the same as using finding by id state resource) ([a1bb9b9](https://github.com/wmfs/tymly-cardscript-plugin/commit/a1bb9b9bcb5a4786a1d5865bd907fbdee4db4b74))
* tidy up get watched boards state resource ([481183b](https://github.com/wmfs/tymly-cardscript-plugin/commit/481183bd5d8415027092cf25419ea89badc9e84f))
* tidy up notifications state resource ([4b87f35](https://github.com/wmfs/tymly-cardscript-plugin/commit/4b87f35b7de35c18977bc156f0be958d917822fa))
* tidy up some state resources ([ef041db](https://github.com/wmfs/tymly-cardscript-plugin/commit/ef041dbec1b52b1ccdc5c3419ee6c14bb63b7e06))
* tidy up watch board state resource ([d249a88](https://github.com/wmfs/tymly-cardscript-plugin/commit/d249a88e71989a99cec9c60e2e754a994f320f7f))


### 🛠 Builds

* **deps:** update several deps ([30fbdd3](https://github.com/wmfs/tymly-cardscript-plugin/commit/30fbdd3c30f9cf7932bf57872696bad6a905c2f0))
* **deps-dev:** update dev dependancies ([0ae9ea7](https://github.com/wmfs/tymly-cardscript-plugin/commit/0ae9ea72e8b6a31243a0188e6d86b9ac0f9d94be))


### 🚨 Tests

* tidy up remit tests ([38032c3](https://github.com/wmfs/tymly-cardscript-plugin/commit/38032c38fc0c3d350a771df02574b0d4263c0e62))

# [1.7.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.6.0...v1.7.0) (2019-09-09)


### 🛠 Builds

* **deps:** update jsonpath requirement from 1.0.1 to 1.0.2 ([3719da3](https://github.com/wmfs/tymly-cardscript-plugin/commit/3719da3))

# [1.6.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.5.0...v1.6.0) (2019-09-09)


### 🛠 Builds

* **deps:** update [@wmfs](https://github.com/wmfs)/form-maker requirement from 1.1.0 to 1.3.0 ([bc1cfae](https://github.com/wmfs/tymly-cardscript-plugin/commit/bc1cfae))

# [1.5.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.4.0...v1.5.0) (2019-07-11)


### 🛠 Builds

* **deps:** update lodash requirement from 4.17.11 to 4.17.14 ([ca96447](https://github.com/wmfs/tymly-cardscript-plugin/commit/ca96447))
* **deps-dev:** update [@semantic-release](https://github.com/semantic-release)/git requirement ([4924307](https://github.com/wmfs/tymly-cardscript-plugin/commit/4924307))
* **deps-dev:** update [@semantic-release](https://github.com/semantic-release)/git requirement ([0fb8940](https://github.com/wmfs/tymly-cardscript-plugin/commit/0fb8940))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/hl-pg-client requirement ([45529a7](https://github.com/wmfs/tymly-cardscript-plugin/commit/45529a7))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([1699c8f](https://github.com/wmfs/tymly-cardscript-plugin/commit/1699c8f))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([4ea5f8b](https://github.com/wmfs/tymly-cardscript-plugin/commit/4ea5f8b))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-rbac-plugin requirement ([1232760](https://github.com/wmfs/tymly-cardscript-plugin/commit/1232760))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-solr-plugin requirement ([c2605f7](https://github.com/wmfs/tymly-cardscript-plugin/commit/c2605f7))
* **deps-dev:** update mocha requirement from 6.0.2 to 6.1.4 ([293cbcd](https://github.com/wmfs/tymly-cardscript-plugin/commit/293cbcd))
* **deps-dev:** update nyc requirement from 13.3.0 to 14.1.1 ([0397136](https://github.com/wmfs/tymly-cardscript-plugin/commit/0397136))
* **deps-dev:** update semantic-release requirement ([a5f4ad5](https://github.com/wmfs/tymly-cardscript-plugin/commit/a5f4ad5))


### 📚 Documentation

* add circleci status [skip ci] ([dbf608d](https://github.com/wmfs/tymly-cardscript-plugin/commit/dbf608d))


### ⚙️ Continuous Integrations

* **circle:** Update CircleCI config - Travis migration ([446359c](https://github.com/wmfs/tymly-cardscript-plugin/commit/446359c))
* **travis:** remove Travis config ([4f3008f](https://github.com/wmfs/tymly-cardscript-plugin/commit/4f3008f))

# [1.4.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.3.1...v1.4.0) (2019-04-05)


### ✨ Features

* Can create and retrieve ToDos assigned to a role ([ccd0564](https://github.com/wmfs/tymly-cardscript-plugin/commit/ccd0564))


### 🛠 Builds

* Bump dev-deps ([005867d](https://github.com/wmfs/tymly-cardscript-plugin/commit/005867d))


### 📦 Code Refactoring

* Fetch todos using code common with get-todo-changes ([5eada45](https://github.com/wmfs/tymly-cardscript-plugin/commit/5eada45))
* Pull findTodos out into a separate function ([0114886](https://github.com/wmfs/tymly-cardscript-plugin/commit/0114886))
* Rework findComponents so it doesn't call processComponents ([c7aa291](https://github.com/wmfs/tymly-cardscript-plugin/commit/c7aa291))


### 🚨 Tests

* Extend remit test to pull todos with role/team ([f0ac479](https://github.com/wmfs/tymly-cardscript-plugin/commit/f0ac479))
* Reorganised tests ahead of adding role todos ([96060a4](https://github.com/wmfs/tymly-cardscript-plugin/commit/96060a4))
* rework tests to use before/after ([cd18e59](https://github.com/wmfs/tymly-cardscript-plugin/commit/cd18e59))
* Use todo id generated by db ([54aa166](https://github.com/wmfs/tymly-cardscript-plugin/commit/54aa166))


### 💎 Styles

* lint fix ([b9439fe](https://github.com/wmfs/tymly-cardscript-plugin/commit/b9439fe))

## [1.3.1](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.3.0...v1.3.1) (2019-04-02)


### 🐛 Bug Fixes

* Don't try and update null launches ([a6c1571](https://github.com/wmfs/tymly-cardscript-plugin/commit/a6c1571))
* Inject ToDo Id into launches ([6f7c0d7](https://github.com/wmfs/tymly-cardscript-plugin/commit/6f7c0d7))

# [1.3.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.2.0...v1.3.0) (2019-03-27)


### ✨ Features

* expose canBeStartedOffline property in cardscript-plugin ([89e818b](https://github.com/wmfs/tymly-cardscript-plugin/commit/89e818b))


### 🛠 Builds

* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly to 1.90.2 ([f58d697](https://github.com/wmfs/tymly-cardscript-plugin/commit/f58d697))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-rbac-plugin requirement ([c8c9d7c](https://github.com/wmfs/tymly-cardscript-plugin/commit/c8c9d7c))

# [1.2.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.1.4...v1.2.0) (2019-03-22)


### 🛠 Builds

* **deps:** update jsonpath requirement from 1.0.0 to 1.0.1 ([f1b1603](https://github.com/wmfs/tymly-cardscript-plugin/commit/f1b1603))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/hl-pg-client requirement ([78a88c2](https://github.com/wmfs/tymly-cardscript-plugin/commit/78a88c2))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([9c047be](https://github.com/wmfs/tymly-cardscript-plugin/commit/9c047be))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-solr-plugin requirement ([bcb7539](https://github.com/wmfs/tymly-cardscript-plugin/commit/bcb7539))
* **deps-dev:** update codecov requirement from 3.1.0 to 3.2.0 ([af412f1](https://github.com/wmfs/tymly-cardscript-plugin/commit/af412f1))
* **deps-dev:** update mocha requirement from 5.2.0 to 6.0.2 ([a944abc](https://github.com/wmfs/tymly-cardscript-plugin/commit/a944abc))
* **deps-dev:** update nyc requirement from 13.2.0 to 13.3.0 ([80f09f2](https://github.com/wmfs/tymly-cardscript-plugin/commit/80f09f2))


### 📚 Documentation

* **README:** Fix link to Travis ([d9ed65a](https://github.com/wmfs/tymly-cardscript-plugin/commit/d9ed65a))

## [1.1.4](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.1.3...v1.1.4) (2019-03-22)


### 🐛 Bug Fixes

* Injected watchBoard subscriptionId into launches ([7a8573f](https://github.com/wmfs/tymly-cardscript-plugin/commit/7a8573f))


### 💎 Styles

* **biscuits:** Lint fix. ([b1ad4d7](https://github.com/wmfs/tymly-cardscript-plugin/commit/b1ad4d7))

## [1.1.3](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.1.2...v1.1.3) (2019-03-21)


### 🐛 Bug Fixes

* remove logs ([ff42ab8](https://github.com/wmfs/tymly-cardscript-plugin/commit/ff42ab8))

## [1.1.2](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.1.1...v1.1.2) (2019-03-21)


### 🐛 Bug Fixes

* test log to check on dev ([7c8f474](https://github.com/wmfs/tymly-cardscript-plugin/commit/7c8f474))

## [1.1.1](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.1.0...v1.1.1) (2019-03-20)


### 🐛 Bug Fixes

* remove bad character in schema json ([aaf4543](https://github.com/wmfs/tymly-cardscript-plugin/commit/aaf4543))

# [1.1.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.0.0...v1.1.0) (2019-03-19)


### ✨ Features

* pass on instigator group in remit ([421e41b](https://github.com/wmfs/tymly-cardscript-plugin/commit/421e41b))


### 🛠 Builds

* **dev-deps:** Bump nyc, semantic-release, and [@wmfs](https://github.com/wmfs)/* dev deps ([9dd4112](https://github.com/wmfs/tymly-cardscript-plugin/commit/9dd4112))


### ⚙️ Continuous Integrations

* **circle:** add circle ci config ([11f5477](https://github.com/wmfs/tymly-cardscript-plugin/commit/11f5477))
* **travis:** update travis config ([c8592ec](https://github.com/wmfs/tymly-cardscript-plugin/commit/c8592ec))

# 1.0.0 (2019-01-17)


### ✨ Features

* initial commit for tymly-cardscript-plugin crossover ([affc745](https://github.com/wmfs/tymly-cardscript-plugin/commit/affc745))


### 🐛 Bug Fixes

* remove cardscript from keywords ([48be0d3](https://github.com/wmfs/tymly-cardscript-plugin/commit/48be0d3))
* standard ([6d98092](https://github.com/wmfs/tymly-cardscript-plugin/commit/6d98092))
* standard by hand because what is a linter ([2108e86](https://github.com/wmfs/tymly-cardscript-plugin/commit/2108e86))


### 📦 Code Refactoring

* Add detail to some examples ([b2b76c6](https://github.com/wmfs/tymly-cardscript-plugin/commit/b2b76c6))
