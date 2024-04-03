# Changelog

## 1.0.0 (2024-04-03)


### Bug Fixes

* **aws:** remove for OSS ([#359](https://github.com/telicent-oss/telicent-access/issues/359)) ([9a10e6b](https://github.com/telicent-oss/telicent-access/commit/9a10e6b8d171ee33f5a6cf30fea58c80968fcd0c))

## [0.11.2](https://github.com/Telicent-io/telicent-access/compare/v0.11.1...v0.11.2) (2024-01-12)


### Bug Fixes

* remove memoize of fetch key of the token ([afcd326](https://github.com/Telicent-io/telicent-access/commit/afcd3263eb5e286a82a0c132cbade63166380e4a))

## [0.11.1](https://github.com/Telicent-io/telicent-access/compare/v0.11.0...v0.11.1) (2023-12-20)


### Bug Fixes

* **hierarchies read.js:** fix the hierarchy lookup end point ([be4ff00](https://github.com/Telicent-io/telicent-access/commit/be4ff00f7ad4ed670ee6e0bcb30682df2bbbbdef))

## [0.11.0](https://github.com/Telicent-io/telicent-access/compare/v0.10.1...v0.11.0) (2023-12-11)


### Features

* add search feature ([0e44b55](https://github.com/Telicent-io/telicent-access/commit/0e44b55191cb7751df8b14984e0c3f6dac207f00))
* add user details endpoint ([4401d23](https://github.com/Telicent-io/telicent-access/commit/4401d23d402f939c31e6469046b7cbc17b31ceac))
* add user information to groups endpoints ([5d716fc](https://github.com/Telicent-io/telicent-access/commit/5d716fc685c82413c466e0ff01d2bc9ba13f753f))
* **groups:** merge and/or group in UI ([7b4919e](https://github.com/Telicent-io/telicent-access/commit/7b4919e12addcf66798b923f7b798290c8e3634e))
* modified sorting function to be chained with the filter, fix test, and add new test ([f18a57b](https://github.com/Telicent-io/telicent-access/commit/f18a57b9745bf7332fcc21fbf7f95905d4bb18fd))
* updating filter functions to work together and eliminate all states ([dafe695](https://github.com/Telicent-io/telicent-access/commit/dafe695424f1023b459dd7080c95bd6ba1e4d209))


### Bug Fixes

* **create group:** fix create group validation and error messages ([#287](https://github.com/Telicent-io/telicent-access/issues/287)) ([2ea8ea2](https://github.com/Telicent-io/telicent-access/commit/2ea8ea27f989dd1372ac8e256681e872a3653764)), closes [#280](https://github.com/Telicent-io/telicent-access/issues/280)
* fix forms to pick up new group format for update ([7496dec](https://github.com/Telicent-io/telicent-access/commit/7496dec27b3d5a1a42b3744b11d1e2b4781bf409))
* fix scim disabled create btn logic ([fcff118](https://github.com/Telicent-io/telicent-access/commit/fcff1188e9b2ddeb6b62580bfd8bde1694ad4104))
* fix sorting bug ([172dc41](https://github.com/Telicent-io/telicent-access/commit/172dc4175e5c5c72a3916ba15b2f67ae37e550ad))
* **groups/users:** add tooltips to group and user list truncated text ([00f9d29](https://github.com/Telicent-io/telicent-access/commit/00f9d298885363e00d7dafd1eaad08ab5d2ce0d4)), closes [#281](https://github.com/Telicent-io/telicent-access/issues/281)
* update group create to trim the final description before submit ([30f9723](https://github.com/Telicent-io/telicent-access/commit/30f97234365dd42600eb6957396fcbfad06813e6))

## [0.10.1](https://github.com/Telicent-io/telicent-access/compare/v0.10.0...v0.10.1) (2023-09-19)


### Bug Fixes

* make access and secret key null by default ([2eedf1f](https://github.com/Telicent-io/telicent-access/commit/2eedf1f6eef3be13a813981f63a280d396126c4b))

## [0.10.0](https://github.com/Telicent-io/telicent-access/compare/v0.9.41...v0.10.0) (2023-09-19)


### Features

* add configurable Mongo rewrite config ([0da1c99](https://github.com/Telicent-io/telicent-access/commit/0da1c99029291cf3c8da4b11f4861f153a920f8b))
* add prepare-commit-msg ([bd82f09](https://github.com/Telicent-io/telicent-access/commit/bd82f091387006da1255ea5b591e6bcea0e12825))

## [0.9.41](https://github.com/Telicent-io/telicent-access/compare/v0.9.40...v0.9.41) (2023-08-30)


### Bug Fixes

* remove collation to make compatible with AWS DocumentDB MS ([0f080c1](https://github.com/Telicent-io/telicent-access/commit/0f080c114dee01da9e745615fc899df2189983ad))

## [0.9.40](https://github.com/Telicent-io/telicent-access/compare/v0.9.39...v0.9.40) (2023-08-25)


### Bug Fixes

* **publish.yml:** whitespace test ([158faf6](https://github.com/Telicent-io/telicent-access/commit/158faf69b0a4566df3501bb8520141c17cc93a7d))

## [0.9.39](https://github.com/Telicent-io/telicent-access/compare/v0.9.38...v0.9.39) (2023-08-25)


### Bug Fixes

* **publish.yml:** fix frontend bom generation ([4b4d052](https://github.com/Telicent-io/telicent-access/commit/4b4d052e81f2c123da471346b8a1c5888217f496))

## [0.9.38](https://github.com/Telicent-io/telicent-access/compare/v0.9.37...v0.9.38) (2023-08-25)


### Bug Fixes

* **publish.yml:** fix frontend bom generation ([5b324e9](https://github.com/Telicent-io/telicent-access/commit/5b324e954a7e70c220707abc1ca2750b04f49a1e))

## [0.9.37](https://github.com/Telicent-io/telicent-access/compare/v0.9.36...v0.9.37) (2023-08-25)


### Bug Fixes

* **publish.yml:** fix frontend bom generation ([4b1437d](https://github.com/Telicent-io/telicent-access/commit/4b1437dbc9eb07db0bcc17ec0165531b13b4c573))

## [0.9.36](https://github.com/Telicent-io/telicent-access/compare/v0.9.35...v0.9.36) (2023-08-25)


### Bug Fixes

* **publish.yml:** fix frontend bom generation ([ee2d7aa](https://github.com/Telicent-io/telicent-access/commit/ee2d7aa3944aa5bb6ab7b4e9f688130592e4bbb5))

## [0.9.35](https://github.com/Telicent-io/telicent-access/compare/v0.9.34...v0.9.35) (2023-08-25)


### Bug Fixes

* **aws adapter:** whitespace change to trigger workflow ([93caccb](https://github.com/Telicent-io/telicent-access/commit/93caccb40b567830d67f7f4f3f3473da0911bc43))

## [0.9.34](https://github.com/Telicent-io/telicent-access/compare/v0.9.33...v0.9.34) (2023-08-04)


### Bug Fixes

* **publish.yml:** correct variable name ([2264717](https://github.com/Telicent-io/telicent-access/commit/22647174dc84206e5d48febd5fc629e6d999898a))

## [0.9.33](https://github.com/Telicent-io/telicent-access/compare/v0.9.32...v0.9.33) (2023-08-04)


### Bug Fixes

* **publish.yml:** add permissions to workflow ([340e44b](https://github.com/Telicent-io/telicent-access/commit/340e44b8d8433f7671053d191b74ad04ac97d28f))

## [0.9.32](https://github.com/Telicent-io/telicent-access/compare/v0.9.31...v0.9.32) (2023-08-04)


### Bug Fixes

* **publish.yml:** clear aws role ([a7cedd2](https://github.com/Telicent-io/telicent-access/commit/a7cedd2b2fdb91ac46bd4db2e6c5a7d26a931320))
* **publish.yml:** update region on ssm put ([bb2d6eb](https://github.com/Telicent-io/telicent-access/commit/bb2d6eba808bd93037339ad4359609424c01a360))
* **publish.yml:** update region on ssm put ([68c6796](https://github.com/Telicent-io/telicent-access/commit/68c6796c242ba0a89e362272bdcab0410194dc19))

## [0.9.31](https://github.com/Telicent-io/telicent-access/compare/v0.9.30...v0.9.31) (2023-08-03)


### Bug Fixes

* **publish.yml:** update role ([8414a50](https://github.com/Telicent-io/telicent-access/commit/8414a5039479353fb229587e1c63f0454fed6e59))

## [0.9.30](https://github.com/Telicent-io/telicent-access/compare/v0.9.29...v0.9.30) (2023-08-03)


### Bug Fixes

* **publish.yml:** update role ([a11f904](https://github.com/Telicent-io/telicent-access/commit/a11f904e4769f03ad0ca269032236ee1e255b85b))

## [0.9.29](https://github.com/Telicent-io/telicent-access/compare/v0.9.28...v0.9.29) (2023-08-03)


### Bug Fixes

* **publish.yml:** log in with GitCICD role ([5694b2b](https://github.com/Telicent-io/telicent-access/commit/5694b2b14bf94479645f07356438366d0f019ae5))

## [0.9.28](https://github.com/Telicent-io/telicent-access/compare/v0.9.27...v0.9.28) (2023-08-03)


### Bug Fixes

* **publish.yml:** wrap quotes around command ([26636a6](https://github.com/Telicent-io/telicent-access/commit/26636a69a16cadf01d378dd011252cbaed90cd98))

## [0.9.27](https://github.com/Telicent-io/telicent-access/compare/v0.9.26...v0.9.27) (2023-08-03)


### Bug Fixes

* **publish.yml:** fix workflow ([fb5e918](https://github.com/Telicent-io/telicent-access/commit/fb5e91805993497af4f547976656487adb39838b))

## [0.9.26](https://github.com/Telicent-io/telicent-access/compare/v0.9.25...v0.9.26) (2023-08-03)


### Bug Fixes

* **update workflow:** use run instead ([05658e0](https://github.com/Telicent-io/telicent-access/commit/05658e0f691bbeb3b541ef3a1cc0d95b62afafc6))

## [0.9.25](https://github.com/Telicent-io/telicent-access/compare/v0.9.24...v0.9.25) (2023-08-03)


### Bug Fixes

* **publish.yml:** whitespace change to trigger pipeline ([e16f2ea](https://github.com/Telicent-io/telicent-access/commit/e16f2ea42075ca7cf31af4ea36c87797e7989dc9))

## [0.9.24](https://github.com/Telicent-io/telicent-access/compare/v0.9.23...v0.9.24) (2023-08-03)


### Bug Fixes

* **publish.yml:** whitespace change to trigger pipeline ([2781e10](https://github.com/Telicent-io/telicent-access/commit/2781e10711ae0c3291b5bebd9c5dba1fea7b3a88))

## [0.9.23](https://github.com/Telicent-io/telicent-access/compare/v0.9.22...v0.9.23) (2023-08-03)


### Bug Fixes

* **publish.yml:** whitespace change to trigger pipeline ([d64d5ad](https://github.com/Telicent-io/telicent-access/commit/d64d5ad482116d7c08f7d1789e8201b0bb0fc602))

## [0.9.22](https://github.com/Telicent-io/telicent-access/compare/v0.9.21...v0.9.22) (2023-08-03)


### Bug Fixes

* **publish.yml:** whitespace change to trigger pipeline ([e50ab45](https://github.com/Telicent-io/telicent-access/commit/e50ab4510150661de1f57de7f47338beab104a48))

## [0.9.21](https://github.com/Telicent-io/telicent-access/compare/v0.9.20...v0.9.21) (2023-08-03)


### Bug Fixes

* **publish.yml:** whitespace change to trigger pipeline ([63ec519](https://github.com/Telicent-io/telicent-access/commit/63ec5191c8f47a50b86e8f3903da186a028455e8))

## [0.9.20](https://github.com/Telicent-io/telicent-access/compare/v0.9.19...v0.9.20) (2023-08-03)


### Bug Fixes

* **dockerfile:** update network timeout ([872d8b6](https://github.com/Telicent-io/telicent-access/commit/872d8b65db7bd8ed4cea763d9e0822f6d17c8e55))

## [0.9.19](https://github.com/Telicent-io/telicent-access/compare/v0.9.18...v0.9.19) (2023-08-03)


### Bug Fixes

* **publish.yml:** whitespace change to trigger pipeline ([3bc0778](https://github.com/Telicent-io/telicent-access/commit/3bc07782fd2a8cbfc9cbd911680a3a60c05255f9))

## [0.9.18](https://github.com/Telicent-io/telicent-access/compare/v0.9.17...v0.9.18) (2023-08-03)


### Bug Fixes

* **publish.yml:** whitespace change to trigger pipeline ([7ff777d](https://github.com/Telicent-io/telicent-access/commit/7ff777d66a184abf4ee3280be6a9b7ce2d1e278e))

## [0.9.17](https://github.com/Telicent-io/telicent-access/compare/v0.9.16...v0.9.17) (2023-08-03)


### Bug Fixes

* **publish.yml:** whitespace change to trigger pipeline ([2891f87](https://github.com/Telicent-io/telicent-access/commit/2891f876827d7e8c73de373d8b0b3814fd2419d2))

## [0.9.16](https://github.com/Telicent-io/telicent-access/compare/v0.9.15...v0.9.16) (2023-08-02)


### Bug Fixes

* **publish.yml:** whitespace change to trigger pipeline ([efe4b3b](https://github.com/Telicent-io/telicent-access/commit/efe4b3b55273a1623da8ee9adf33793438ec5bfc))

## [0.9.15](https://github.com/Telicent-io/telicent-access/compare/v0.9.14...v0.9.15) (2023-08-02)


### Bug Fixes

* **publish.yml:** whitespace change to trigger pipeline ([843f584](https://github.com/Telicent-io/telicent-access/commit/843f58499081270e0e70dde40cc26126c7ca2879))

## [0.9.14](https://github.com/Telicent-io/telicent-access/compare/v0.9.13...v0.9.14) (2023-08-02)


### Bug Fixes

* **publish.yml:** whitespace change to trigger pipeline ([4c86b1c](https://github.com/Telicent-io/telicent-access/commit/4c86b1c8e06a63a4d0008ee7adf255ecf072f593))

## [0.9.13](https://github.com/Telicent-io/telicent-access/compare/v0.9.12...v0.9.13) (2023-08-02)


### Bug Fixes

* **publish.yml:** more syntax errors ([5e4d5d7](https://github.com/Telicent-io/telicent-access/commit/5e4d5d7136a7dff9b8061b03120caeda499e899d))

## [0.9.12](https://github.com/Telicent-io/telicent-access/compare/v0.9.11...v0.9.12) (2023-08-02)


### Bug Fixes

* **publish.yml:** fix syntax error ([587ae64](https://github.com/Telicent-io/telicent-access/commit/587ae649cdb2b4507b94b17167df6b225486b3b3))

## [0.9.11](https://github.com/Telicent-io/telicent-access/compare/v0.9.10...v0.9.11) (2023-08-02)


### Bug Fixes

* **publish.yml:** fix syntax on workflow ([e25fa48](https://github.com/Telicent-io/telicent-access/commit/e25fa48ed4574b0a3e9f3dbf744736b06aad1288))

## [0.9.10](https://github.com/Telicent-io/telicent-access/compare/v0.9.9...v0.9.10) (2023-08-02)


### Bug Fixes

* **publish.yml:** update workflow to update nightly build ([9fe4d24](https://github.com/Telicent-io/telicent-access/commit/9fe4d248742296f33546cdc8f2692e2f0bd5aee9))

## [0.9.9](https://github.com/Telicent-io/telicent-access/compare/v0.9.8...v0.9.9) (2023-07-17)


### Bug Fixes

* **publish.yml:** trigger pipeline ([6962ac9](https://github.com/Telicent-io/telicent-access/commit/6962ac9dfa449311594d6548766b94d763c5a138))

## [0.9.8](https://github.com/Telicent-io/telicent-access/compare/v0.9.7...v0.9.8) (2023-07-17)


### Bug Fixes

* **publish.yml:** trigger pipeline ([2228ed9](https://github.com/Telicent-io/telicent-access/commit/2228ed9e04588be7eda6291afc70f5828dc95e66))

## [0.9.7](https://github.com/Telicent-io/telicent-access/compare/v0.9.6...v0.9.7) (2023-07-17)


### Bug Fixes

* **publish.yml:** add inherit secrets to owasp workflow ([b3efeee](https://github.com/Telicent-io/telicent-access/commit/b3efeeea984222851c7fdfd084885b69a78d1c26))

## [0.9.6](https://github.com/Telicent-io/telicent-access/compare/v0.9.5...v0.9.6) (2023-07-14)


### Bug Fixes

* **publish.yml:** whitespace change to trigger pipeline test ([762af7b](https://github.com/Telicent-io/telicent-access/commit/762af7becdc9892aef4e62fe5fd5457622110e9e))

## [0.9.5](https://github.com/Telicent-io/telicent-access/compare/v0.9.4...v0.9.5) (2023-07-14)


### Bug Fixes

* **publish.yml:** moved comment to trigger test workflow ([c7d9d17](https://github.com/Telicent-io/telicent-access/commit/c7d9d174283c1d343bd466263ebe57a2621bb308))

## [0.9.4](https://github.com/Telicent-io/telicent-access/compare/v0.9.3...v0.9.4) (2023-07-14)


### Bug Fixes

* **publish.yml:** invalid syntax fix ([8ccaa57](https://github.com/Telicent-io/telicent-access/commit/8ccaa57c3d52d209d8d3bcb2a6e38f8c7c33be07))

## [0.9.3](https://github.com/Telicent-io/telicent-access/compare/v0.9.2...v0.9.3) (2023-07-14)


### Bug Fixes

* **publish.yml:** fix secrets inherit ([45d335d](https://github.com/Telicent-io/telicent-access/commit/45d335d7527c34877691ea2aaca9ca5dd2b20128))

## [0.9.2](https://github.com/Telicent-io/telicent-access/compare/v0.9.1...v0.9.2) (2023-07-14)


### Bug Fixes

* **publish.yml:** move comment to trigger pipeline test ([a4308d1](https://github.com/Telicent-io/telicent-access/commit/a4308d1871019b99617a41ab3a26a274bbbc6362))

## [0.9.1](https://github.com/Telicent-io/telicent-access/compare/v0.9.0...v0.9.1) (2023-07-14)


### Bug Fixes

* **publish.yml:** fixed misnamed depends_on ([74976e5](https://github.com/Telicent-io/telicent-access/commit/74976e5462add40c795013fc3aeec7f43497e643))

## [0.9.0](https://github.com/Telicent-io/telicent-access/compare/v0.8.1...v0.9.0) (2023-07-14)


### Features

* **publish.yml:** add ability to publish to azure acr ([a1108d6](https://github.com/Telicent-io/telicent-access/commit/a1108d6448dbd1f8ea18606b5644a68c83e77123))


### Bug Fixes

* **users:** update user model to enable password for keycloak ([5bd85d7](https://github.com/Telicent-io/telicent-access/commit/5bd85d754b75ad20a98a54bd9f9c65719e1f1081))

## [0.8.1](https://github.com/Telicent-io/telicent-access/compare/v0.8.0...v0.8.1) (2023-06-08)


### Bug Fixes

* **package.json:** ignore axios transform pattern ([c7b3301](https://github.com/Telicent-io/telicent-access/commit/c7b33015f616b5ef7d4ddc5396063aa01048b8eb))

## [0.8.0](https://github.com/Telicent-io/telicent-access/compare/v0.7.13...v0.8.0) (2023-06-01)


### Features

* add keycloak implementation ([31d2892](https://github.com/Telicent-io/telicent-access/commit/31d2892c8cf0fed168a3c313633035df17afd3e0))
* added update and delete functionality for keycloak ([e7804be](https://github.com/Telicent-io/telicent-access/commit/e7804be36820c5a75a94e2a95ab87917e09d0b5a))
* get existing keycloak users and add to mongo if they dont exist ([fcf9a66](https://github.com/Telicent-io/telicent-access/commit/fcf9a66292ec5be10fb609b0494e347b8d1725ef))
* **temp_password:** added temporary password feature for keycloak ([88a3d5b](https://github.com/Telicent-io/telicent-access/commit/88a3d5be3f2384b3e506052576dfdd259f0fe807))
* wip - new build flow ([3c96204](https://github.com/Telicent-io/telicent-access/commit/3c96204f1da86ab24c306958a604e3f715fd8a91))


### Bug Fixes

* fix API, remove admin into new repo, rework access with react 18 ([524aea3](https://github.com/Telicent-io/telicent-access/commit/524aea3f33ec6a1a38bbc404a486dd5aaaa2671b))
* fix clearance backward compatibility ([2ceca02](https://github.com/Telicent-io/telicent-access/commit/2ceca02b7ae630c341834c107e850e3053a2de62))
* **package.json:** add missing crypto-js dependency ([a66209d](https://github.com/Telicent-io/telicent-access/commit/a66209d4108ceab9cb2262bcb3dbb0c8f564ae87))
* **publish.yml:** whitespace test ([12f1b4c](https://github.com/Telicent-io/telicent-access/commit/12f1b4cb4f37f46170a2e67d2f7c7d5bba40108d))
* **users:** return functions from module after config has been loaded in ([da2d94c](https://github.com/Telicent-io/telicent-access/commit/da2d94ce4fd1d7f445b8604b06320a3dc4e24afb))

## [0.7.13](https://github.com/Telicent-io/telicent-access/compare/v0.7.12...v0.7.13) (2023-02-10)


### Bug Fixes

* set default port ([2feb39c](https://github.com/Telicent-io/telicent-access/commit/2feb39c5475fb04d0e34ac8484a312aa9e4b18f9))

## [0.7.12](https://github.com/Telicent-io/telicent-access/compare/v0.7.11...v0.7.12) (2023-02-10)


### Bug Fixes

* fix port number in env config ([917abdf](https://github.com/Telicent-io/telicent-access/commit/917abdfc90177187e83a4bd878570444eb664948))

## [0.7.11](https://github.com/Telicent-io/telicent-access/compare/v0.7.10...v0.7.11) (2023-02-10)


### Bug Fixes

* remove trailing slash ([0fe485c](https://github.com/Telicent-io/telicent-access/commit/0fe485c438648bcbbfae24aed7889f654c6391d4))

## [0.7.10](https://github.com/Telicent-io/telicent-access/compare/v0.7.9...v0.7.10) (2023-02-10)


### Bug Fixes

* add whitespace for testt ([0c595e4](https://github.com/Telicent-io/telicent-access/commit/0c595e40c16d1b65bf18a98f6438f2f057b83037))

## [0.7.9](https://github.com/Telicent-io/telicent-access/compare/v0.7.8...v0.7.9) (2023-02-10)


### Bug Fixes

* change how path needs to be input to workflow ([f93bcad](https://github.com/Telicent-io/telicent-access/commit/f93bcadb9966743331c085d67a3e53b4c0b3fc9e))

## [0.7.8](https://github.com/Telicent-io/telicent-access/compare/v0.7.7...v0.7.8) (2023-02-10)


### Bug Fixes

* try prepending path with dot forward slash ([518d395](https://github.com/Telicent-io/telicent-access/commit/518d395f4398ab6b35889ac803717202865b18b4))

## [0.7.7](https://github.com/Telicent-io/telicent-access/compare/v0.7.6...v0.7.7) (2023-02-10)


### Bug Fixes

* add whitespace for test ([f257fd1](https://github.com/Telicent-io/telicent-access/commit/f257fd1773737b90f5f3ca8dc376583fbc047b1c))

## [0.7.6](https://github.com/Telicent-io/telicent-access/compare/v0.7.5...v0.7.6) (2023-02-10)


### Bug Fixes

* **publish.yml:** white space test ([e0b4a48](https://github.com/Telicent-io/telicent-access/commit/e0b4a489028b82133a453013b2af3b21c91f1572))

## [0.7.5](https://github.com/Telicent-io/telicent-access/compare/v0.7.4...v0.7.5) (2023-02-10)


### Bug Fixes

* **publish.yml:** white space change for test ([9d02f90](https://github.com/Telicent-io/telicent-access/commit/9d02f90594f7eaaada7486a004599caa93f53c29))

## [0.7.4](https://github.com/Telicent-io/telicent-access/compare/v0.7.3...v0.7.4) (2023-02-10)


### Bug Fixes

* **publish.yml:** add white space change for testing ([167c601](https://github.com/Telicent-io/telicent-access/commit/167c6015f21fc4823fd6e76a5e4e7b8e22cddca7))

## [0.7.3](https://github.com/Telicent-io/telicent-access/compare/v0.7.2...v0.7.3) (2023-02-10)


### Bug Fixes

* **publish.yml:** white space change ([15eac3c](https://github.com/Telicent-io/telicent-access/commit/15eac3c8c559758bf46c7627e60c8bf8f33c9f88))

## [0.7.2](https://github.com/Telicent-io/telicent-access/compare/v0.7.1...v0.7.2) (2023-02-10)


### Bug Fixes

* white space push to trigger updated pipeline ([6cfe4d4](https://github.com/Telicent-io/telicent-access/commit/6cfe4d40947178dc764e355fc741360dc5eb2d44))

## [0.7.1](https://github.com/Telicent-io/telicent-access/compare/v0.7.0...v0.7.1) (2023-02-10)


### Bug Fixes

* **docker-compose.yml:** closes [#116](https://github.com/Telicent-io/telicent-access/issues/116) ([756e947](https://github.com/Telicent-io/telicent-access/commit/756e94723e7caa485793a21a271e586eb703bb21))

## [0.7.0](https://github.com/Telicent-io/telicent-access/compare/v0.6.3...v0.7.0) (2023-02-03)


### Features

* enable api to add new and old ABAC styles ([78e4005](https://github.com/Telicent-io/telicent-access/commit/78e40059006b18ecced5b1ed5a17b21cdfae2257))


### Bug Fixes

* address pr comments ([125db7f](https://github.com/Telicent-io/telicent-access/commit/125db7f2b0e0409b0c767c958dce899ba00795ec))
* fix conflicts ([24a261c](https://github.com/Telicent-io/telicent-access/commit/24a261cf3e352a9d85322246f93fa52e2016842d))
* update attributes to contain additional values aper the ICIHM docs ([19427dc](https://github.com/Telicent-io/telicent-access/commit/19427dcc0358bbe301072835abb0837bc727a3b4))

## [0.6.3](https://github.com/Telicent-io/telicent-access/compare/v0.6.2...v0.6.3) (2023-01-31)


### Bug Fixes

* **dockerfile:** test not having production flag in docker build for workflow ([eea67d6](https://github.com/Telicent-io/telicent-access/commit/eea67d62e4b77ff18382a61d84711b2935ace728))

## [0.6.2](https://github.com/Telicent-io/telicent-access/compare/v0.6.1...v0.6.2) (2023-01-31)


### Bug Fixes

* **publish.yml:** update publish.yml to build api on release ([96029a6](https://github.com/Telicent-io/telicent-access/commit/96029a60f28e7e81f995f3e1783e0f5ed2730d72))

## [0.6.1](https://github.com/Telicent-io/telicent-access/compare/v0.6.0...v0.6.1) (2023-01-31)


### Bug Fixes

* **lockfile:** yarn.lock updated ([adcd437](https://github.com/Telicent-io/telicent-access/commit/adcd437f71d9a99248633fba1938fbb9029944a4))

## [0.6.0](https://github.com/Telicent-io/telicent-access/compare/v0.5.0...v0.6.0) (2023-01-30)


### Features

* add default hierarchies and link hierarchies to user ([923dca9](https://github.com/Telicent-io/telicent-access/commit/923dca92c356b9adaf0b5f36300395fc4c6b7805)), closes [#53](https://github.com/Telicent-io/telicent-access/issues/53)
* create default hierarchy if none exist already ([5741e56](https://github.com/Telicent-io/telicent-access/commit/5741e56418f0cba2e0203f2fe4d410112613709d)), closes [#53](https://github.com/Telicent-io/telicent-access/issues/53)


### Bug Fixes

* **create hierarchy:** create hierarchy panel doesn't show ([dc50a35](https://github.com/Telicent-io/telicent-access/commit/dc50a357239672689383cb46a1c7081a5903a499)), closes [#81](https://github.com/Telicent-io/telicent-access/issues/81)
* fix conflict errors ([42afb45](https://github.com/Telicent-io/telicent-access/commit/42afb45b3bf3584d6cc5b53ddd9cfd9c2c97c88f))
* fix hierarchy panel not showing ([bdcfb21](https://github.com/Telicent-io/telicent-access/commit/bdcfb21727a4859a6a02796cc31f4160e7ed8685))
* fixed eslint expecting a json structure ([4c3cc3c](https://github.com/Telicent-io/telicent-access/commit/4c3cc3cfd5e69ea157e392e916d5d9c254a626e1))
* **hierarchies:** alter lookup and get hierarchy lookup ([e67b5cd](https://github.com/Telicent-io/telicent-access/commit/e67b5cd2fff9e26ec041a7c7693a05088092cd0e))
* **hierarchies:** remove console.logs ([5b2ab85](https://github.com/Telicent-io/telicent-access/commit/5b2ab85afd6227f472a79a2f02eef5f31bed0da8))
* make changes requested in PR ([e3ff823](https://github.com/Telicent-io/telicent-access/commit/e3ff823ccbc71380916d48adc53372cbb6dabf96)), closes [#53](https://github.com/Telicent-io/telicent-access/issues/53)
* rebase [#90](https://github.com/Telicent-io/telicent-access/issues/90) into [#91](https://github.com/Telicent-io/telicent-access/issues/91) ([e9ed8aa](https://github.com/Telicent-io/telicent-access/commit/e9ed8aa76690307c7e6308f000eedb1fa5705e98))
* switch out the value clearance for tier ([b53330d](https://github.com/Telicent-io/telicent-access/commit/b53330d652748e93eca974649aba0ce958bc6bce))
* update hierarchies to reflect 404 in the same way as user ([5aec24d](https://github.com/Telicent-io/telicent-access/commit/5aec24de4ca017056714123a517a02835da5cbb0)), closes [#53](https://github.com/Telicent-io/telicent-access/issues/53)
* update patch endpoint to modify attributes to reflect changes ([f0e3411](https://github.com/Telicent-io/telicent-access/commit/f0e3411388cb0511bf33092e7272a5e28c56a8b2)), closes [#91](https://github.com/Telicent-io/telicent-access/issues/91)
* update schema to use uuid and hide mongo internal fields ([5d55658](https://github.com/Telicent-io/telicent-access/commit/5d556582e4354c66fec67d359e93a344b3403880))
* use classification instead of government and add enum for dropdown on create user ([849b535](https://github.com/Telicent-io/telicent-access/commit/849b5350a17ff355802a785f562ca308ec0c0723))

## [0.5.0](https://github.com/Telicent-io/telicent-access/compare/v0.4.4...v0.5.0) (2022-12-05)


### ⚠ BREAKING CHANGES

* **users.js:** New attribute format is used, requires applications to use rdf-abac 0.6.0 or later

### Bug Fixes

* **users.js:** quote all returned attributes ([#67](https://github.com/Telicent-io/telicent-access/issues/67)) ([94b85fb](https://github.com/Telicent-io/telicent-access/commit/94b85fbf7a5a27f8cb47b25f3ec4b4dd13f99150))

## [0.4.4](https://github.com/Telicent-io/telicent-access/compare/v0.4.3...v0.4.4) (2022-09-29)


### Bug Fixes

* **create-release-pr.yml:** set prerelease to false ([ed65274](https://github.com/Telicent-io/telicent-access/commit/ed652748dde326b08fdda436a3c709888bb83b50))

## [0.4.3](https://github.com/Telicent-io/telicent-access/compare/v0.4.2...v0.4.3) (2022-09-29)


### Bug Fixes

* **publish.yml:** aws s3 command needs to copy the correct folder path ([66ddb41](https://github.com/Telicent-io/telicent-access/commit/66ddb41044d701509e38fb591b829b0350ffe644))

## [0.4.2](https://github.com/Telicent-io/telicent-access/compare/v0.4.1...v0.4.2) (2022-09-29)


### Bug Fixes

* **publish.yml:** make reports folder in correct directory ([1ef8ca7](https://github.com/Telicent-io/telicent-access/commit/1ef8ca74733ea655817b6ef06c2ce115ac6cd539))

## [0.4.1](https://github.com/Telicent-io/telicent-access/compare/v0.4.0...v0.4.1) (2022-09-29)


### Bug Fixes

* **publish.yml:** add ci tests ([461b2fe](https://github.com/Telicent-io/telicent-access/commit/461b2fe9a456eeeb1f2e276fa425b0948cac156b))
* **setuptests:** attempt to get tests to pass in workflow, not just locally ([fa300af](https://github.com/Telicent-io/telicent-access/commit/fa300afea9ff82b6eab4de3ab5b725f9b7d8d5c6))
* **test-feature-branch.yml:** fix where to run tests ([282f5ef](https://github.com/Telicent-io/telicent-access/commit/282f5ef077df9d0a36de77acb85cb3231e308f4d))
* **test-feature-branch.yml:** fix yarn test location ([85d0586](https://github.com/Telicent-io/telicent-access/commit/85d0586beb9ed12cac2d6bed156d5d2657711e97))
