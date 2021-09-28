## [1.33.1](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.33.0...v1.33.1) (2021-09-28)


### 🐛 Bug Fixes

* option to find long running tasks for all users ([e5a3d31](https://github.com/wmfs/tymly-cardscript-plugin/commit/e5a3d31b6420cf46d3c1701663d1eef99a510684))

# [1.33.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.32.0...v1.33.0) (2021-09-28)


### ✨ Features

* change archive stale execs to 24 hours [sc-10553] ([55470df](https://github.com/wmfs/tymly-cardscript-plugin/commit/55470dfb0c656d14233c628b834866856988c3d0))
* clear completed long running tasks when listing [sc-10553] ([64c9a0c](https://github.com/wmfs/tymly-cardscript-plugin/commit/64c9a0c939df563b0c48eac9009d9d609044d269))
* refactor long running tasks into service and clear on archive execution [sc-10553] ([7477464](https://github.com/wmfs/tymly-cardscript-plugin/commit/7477464df5016b89f3133e4303ced4c5e212b797))
* state machine to kill stale long running tasks [sc-10508] ([4ff72ec](https://github.com/wmfs/tymly-cardscript-plugin/commit/4ff72ec03f9e0b0ee7d4a48a046d65d24cfde1e1))


### 🛠 Builds

* **deps-dev:** update dependency [@semantic-release](https://github.com/semantic-release)/changelog to v6 ([abc09b3](https://github.com/wmfs/tymly-cardscript-plugin/commit/abc09b3fad1577b47574b9f1f24f857bd1df95ca))
* **deps-dev:** update dependency [@semantic-release](https://github.com/semantic-release)/exec to v6 ([400f97e](https://github.com/wmfs/tymly-cardscript-plugin/commit/400f97eaeaa862fadbd719e2055c6012cd6ba847))
* **deps-dev:** update dependency [@semantic-release](https://github.com/semantic-release)/git to v10 ([562a0f7](https://github.com/wmfs/tymly-cardscript-plugin/commit/562a0f7c141bcdb2f8579a4d0cb5f9aeb6a12057))
* **deps-dev:** update dependency [@wmfs](https://github.com/wmfs)/tymly to v1.216.0 ([80e540c](https://github.com/wmfs/tymly-cardscript-plugin/commit/80e540cc3631a0eeb4e10e3d20350138bd9fac68))
* **deps-dev:** update dependency [@wmfs](https://github.com/wmfs)/tymly-rbac-plugin to v1.18.1 ([3024b41](https://github.com/wmfs/tymly-cardscript-plugin/commit/3024b41173f92198361c21d4ca08cbfda4390852))
* **deps-dev:** update dependency [@wmfs](https://github.com/wmfs)/tymly-solr-plugin to v2.27.0 ([7fefbfc](https://github.com/wmfs/tymly-cardscript-plugin/commit/7fefbfc11069e66eb11cedc4d0d986a0fda07ec5))
* **deps-dev:** update dependency mocha to v9.1.2 ([cccfe42](https://github.com/wmfs/tymly-cardscript-plugin/commit/cccfe42c0afec51606e83efbd62e840ec4d9daca))
* **deps-dev:** update dependency semantic-release to v18 ([b024c05](https://github.com/wmfs/tymly-cardscript-plugin/commit/b024c05b317495bd7e03f36251c424ba67a50993))


### 🚨 Tests

* expected card on remit ([0ec8b4f](https://github.com/wmfs/tymly-cardscript-plugin/commit/0ec8b4ffe0280253ce9c5d16a92d810ce4386430))

# [1.32.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.31.0...v1.32.0) (2021-09-13)


### ✨ Features

* re-assign todos to another user or team ([3d40375](https://github.com/wmfs/tymly-cardscript-plugin/commit/3d40375059f7b60a8d2891a813fb1316447e23be))


### 🛠 Builds

* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.27.0 to 1.28.0 ([cd26baa](https://github.com/wmfs/tymly-cardscript-plugin/commit/cd26baa0cee36a569227b171fcf04d5a6dabd9b9))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.209.0 to 1.210.0 ([9abda72](https://github.com/wmfs/tymly-cardscript-plugin/commit/9abda729e90345278c0a29e217b352c57b8709dd))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.210.0 to 1.211.0 ([ca0ef14](https://github.com/wmfs/tymly-cardscript-plugin/commit/ca0ef14f1972e72c4deb24e9a9b8cbf1286f2f97))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.211.0 to 1.212.0 ([c9dd615](https://github.com/wmfs/tymly-cardscript-plugin/commit/c9dd615c66932c4cbf6fb6a51f2b380f96eee015))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.252.0 to 1.253.0 ([7bea556](https://github.com/wmfs/tymly-cardscript-plugin/commit/7bea556dd822e04ab4e751bd5cfae915c36b8c6a))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.24.1 to 2.25.0 ([b2009cc](https://github.com/wmfs/tymly-cardscript-plugin/commit/b2009cc1aa9e8c77c6a85acc939a54d9066e18ba))
* **deps-dev:** bump codecov from 3.8.2 to 3.8.3 ([875b8f7](https://github.com/wmfs/tymly-cardscript-plugin/commit/875b8f73ded6a7568502f6d16305307fd2efebf4))
* **deps-dev:** bump mocha from 9.0.2 to 9.0.3 ([4206000](https://github.com/wmfs/tymly-cardscript-plugin/commit/4206000c10c60a02fa6b8aedb269ef16b78f8232))
* **deps-dev:** update dependency [@semantic-release](https://github.com/semantic-release)/git to v9.0.1 ([11ba111](https://github.com/wmfs/tymly-cardscript-plugin/commit/11ba1118f9334a9bd6dae06241b55cac956a0e1d))
* **deps-dev:** update dependency [@wmfs](https://github.com/wmfs)/tymly to v1.212.2 ([32d0505](https://github.com/wmfs/tymly-cardscript-plugin/commit/32d0505fa001ca70101fe8d4fd89c9819966c562))
* **deps-dev:** update dependency [@wmfs](https://github.com/wmfs)/tymly to v1.212.3 ([103bf60](https://github.com/wmfs/tymly-cardscript-plugin/commit/103bf609c42f5b896cee268277d4c97f57d909e5))
* **deps-dev:** update dependency [@wmfs](https://github.com/wmfs)/tymly to v1.212.4 ([2e60ef0](https://github.com/wmfs/tymly-cardscript-plugin/commit/2e60ef0402eff9647150a921f156b8a984d1a25f))
* **deps-dev:** update dependency [@wmfs](https://github.com/wmfs)/tymly to v1.213.0 ([03e923d](https://github.com/wmfs/tymly-cardscript-plugin/commit/03e923d8e7108d5d0917ddf8a4fbe8dca97381f0))
* **deps-dev:** update dependency [@wmfs](https://github.com/wmfs)/tymly-pg-plugin to v1.255.0 ([14792bd](https://github.com/wmfs/tymly-cardscript-plugin/commit/14792bd964ca4451fa7779325ab41056adece242))
* **deps-dev:** update dependency [@wmfs](https://github.com/wmfs)/tymly-pg-plugin to v1.256.0 ([5ff33fd](https://github.com/wmfs/tymly-cardscript-plugin/commit/5ff33fd6915ea5138d95599e66b2a23ba85fdfd0))
* **deps-dev:** update dependency [@wmfs](https://github.com/wmfs)/tymly-solr-plugin to v2.26.0 ([17e0b02](https://github.com/wmfs/tymly-cardscript-plugin/commit/17e0b0280deceebfeacd68966e4713042e854a84))
* **deps-dev:** update dependency [@wmfs](https://github.com/wmfs)/tymly-test-helpers to v1.10.0 ([2453c9a](https://github.com/wmfs/tymly-cardscript-plugin/commit/2453c9a8a9c3f244916857d542464f97884e5205))
* **deps-dev:** update dependency mocha to v9.1.0 ([fce2d23](https://github.com/wmfs/tymly-cardscript-plugin/commit/fce2d2325d28386e4a39e7b751b7f7a00b50c4d7))
* **deps-dev:** update dependency mocha to v9.1.1 ([162088a](https://github.com/wmfs/tymly-cardscript-plugin/commit/162088a20cd141d721cb6b2a6bd5e4cff6220221))
* **deps-dev:** update dependency semantic-release to v17.4.5 ([11434ca](https://github.com/wmfs/tymly-cardscript-plugin/commit/11434ca9e91d86ae7cf85bb5f6f6d7747e3ad1e9))
* **deps-dev:** update dependency semantic-release to v17.4.6 ([d3ad870](https://github.com/wmfs/tymly-cardscript-plugin/commit/d3ad870d382b746bfee92daf17fab998bd6eef6b))
* **deps-dev:** update dependency semantic-release to v17.4.7 ([66162a6](https://github.com/wmfs/tymly-cardscript-plugin/commit/66162a6594295dd714b50d74b401bc28f15ac7fd))


### ♻️ Chores

* add renovate config [ch6600] ([f85751b](https://github.com/wmfs/tymly-cardscript-plugin/commit/f85751bae2ab8930e3f7480b69a92c3ebf19805a))

# [1.31.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.30.0...v1.31.0) (2021-07-09)


### 🛠 Builds

* **deps:** bump debug from 4.3.1 to 4.3.2 ([6c8a5b9](https://github.com/wmfs/tymly-cardscript-plugin/commit/6c8a5b98ab54345d34c905e5aed3888660a67a10))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.201.0 to 1.202.0 ([b9b5653](https://github.com/wmfs/tymly-cardscript-plugin/commit/b9b56533cabf3ec6091a5e3762ff1a08d4076ff8))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.202.0 to 1.203.0 ([c540dc8](https://github.com/wmfs/tymly-cardscript-plugin/commit/c540dc81760411abe18c56b4313b498204d3af5f))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.203.0 to 1.204.0 ([c4a268c](https://github.com/wmfs/tymly-cardscript-plugin/commit/c4a268ca22b5fa3d0c052f8dcd4ae3295dc05a4b))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.204.0 to 1.205.0 ([c5c6f4a](https://github.com/wmfs/tymly-cardscript-plugin/commit/c5c6f4ad7f55d32037d6110cbd9c220cb7b690b3))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.205.0 to 1.206.0 ([fc422d4](https://github.com/wmfs/tymly-cardscript-plugin/commit/fc422d4735c3b45344938103f566834050cef583))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.206.0 to 1.207.0 ([6b09978](https://github.com/wmfs/tymly-cardscript-plugin/commit/6b09978b893026b3a8d29224589fb61c1d6ada0a))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.207.0 to 1.208.0 ([b90b685](https://github.com/wmfs/tymly-cardscript-plugin/commit/b90b6853469479916d47b30653ab1589008cd77d))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.208.0 to 1.209.0 ([dcfe63a](https://github.com/wmfs/tymly-cardscript-plugin/commit/dcfe63a7b30e889a42bd106ff829b749132ddbfa))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.246.1 to 1.247.0 ([1bde423](https://github.com/wmfs/tymly-cardscript-plugin/commit/1bde423b439d9d5539ea82c9a6235c438d94b603))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.247.0 to 1.249.0 ([f9295f1](https://github.com/wmfs/tymly-cardscript-plugin/commit/f9295f142f33d1d484e6feeb799641dbef154c1a))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.249.0 to 1.250.0 ([30a03ba](https://github.com/wmfs/tymly-cardscript-plugin/commit/30a03bae4391f7234a4b8b9669b063ee3e0b4899))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.250.0 to 1.252.0 ([d378e6c](https://github.com/wmfs/tymly-cardscript-plugin/commit/d378e6c6b7135aefc97ac336a3d9151fcbf4708e))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.23.0 to 2.24.0 ([f8651df](https://github.com/wmfs/tymly-cardscript-plugin/commit/f8651dfd377a3fc7b10626871eb3a9958382b10c))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.24.0 to 2.24.1 ([a4beb5d](https://github.com/wmfs/tymly-cardscript-plugin/commit/a4beb5dbb35c6d08d5ecfed0d58321c3a603764b))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-test-helpers from 1.7.0 to 1.8.0 ([2130844](https://github.com/wmfs/tymly-cardscript-plugin/commit/213084467c9ce7e20f91e83d7325fc4132caa54b))
* **deps-dev:** bump mocha from 8.4.0 to 9.0.0 ([8d93e8a](https://github.com/wmfs/tymly-cardscript-plugin/commit/8d93e8aef35c205608e76036179cf2510afc600a))
* **deps-dev:** bump mocha from 9.0.0 to 9.0.1 ([32adf9f](https://github.com/wmfs/tymly-cardscript-plugin/commit/32adf9f9eb3f6fa295db286813d01ee32a99cf3e))
* **deps-dev:** bump mocha from 9.0.1 to 9.0.2 ([37b3dc1](https://github.com/wmfs/tymly-cardscript-plugin/commit/37b3dc1ee96ddb56ea87a203f7e9e62602fbf0bb))
* **deps-dev:** bump semantic-release from 17.4.2 to 17.4.3 ([9d29a63](https://github.com/wmfs/tymly-cardscript-plugin/commit/9d29a6345c9cdefecef910ceeecc3905e1c7454a))
* **deps-dev:** bump semantic-release from 17.4.3 to 17.4.4 ([05eb867](https://github.com/wmfs/tymly-cardscript-plugin/commit/05eb8673f01622c01a53e23a4ffa84858995c40d))

# [1.30.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.29.0...v1.30.0) (2021-05-11)


### 🛠 Builds

* **deps:** revert jsonpath to 1.1.1 [ch6167] ([9322e2e](https://github.com/wmfs/tymly-cardscript-plugin/commit/9322e2e5f0a3f594271ee8d7111c3d55e4c3e669))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.198.0 to 1.199.0 ([b8cc45f](https://github.com/wmfs/tymly-cardscript-plugin/commit/b8cc45ffe892bcefa9f7ddc2555116f0625b79a4))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.199.0 to 1.200.0 ([0eba637](https://github.com/wmfs/tymly-cardscript-plugin/commit/0eba6377e3bb388b1eafeac8d539c6db6feb7471))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.200.0 to 1.201.0 ([7a0d668](https://github.com/wmfs/tymly-cardscript-plugin/commit/7a0d66814b221d37ecc338b741d11f9fb0bb34ac))

# [1.29.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.28.0...v1.29.0) (2021-05-10)


### 🛠 Builds

* **deps:** use master branch for wmfs/jsonpath [ch6167] ([d70c616](https://github.com/wmfs/tymly-cardscript-plugin/commit/d70c61681876ac249ce20479a99f2dd3eeb6c136))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.196.0 to 1.197.0 ([66fe3ac](https://github.com/wmfs/tymly-cardscript-plugin/commit/66fe3ac741e0f67789f089d869cc5d276cf31712))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.197.0 to 1.198.0 ([899132f](https://github.com/wmfs/tymly-cardscript-plugin/commit/899132fbc71e9590e0b5ae705f336100aa8a86fd))

# [1.28.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.27.2...v1.28.0) (2021-05-10)


### 🛠 Builds

* **deps:** bump jsonpath from 1.1.0 to 1.1.1 ([f6ab553](https://github.com/wmfs/tymly-cardscript-plugin/commit/f6ab553d2e9092c25a939274f805b8c5d33a3ce2))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.195.0 to 1.195.1 ([ec56f9d](https://github.com/wmfs/tymly-cardscript-plugin/commit/ec56f9dd0bd7e569cdc0188249f7c4e89c3792ed))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.195.1 to 1.196.0 ([9b12519](https://github.com/wmfs/tymly-cardscript-plugin/commit/9b12519cab73f72c00540e4fd7e95c12ebaeea53))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.246.0 to 1.246.1 ([2e522e6](https://github.com/wmfs/tymly-cardscript-plugin/commit/2e522e689020f9068ba45ca86a4a7b303bace21f))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.22.0 to 2.23.0 ([df14061](https://github.com/wmfs/tymly-cardscript-plugin/commit/df1406132e64083d50f25beac2c636fd49e1be55))
* **deps-dev:** bump codecov from 3.8.1 to 3.8.2 ([c365643](https://github.com/wmfs/tymly-cardscript-plugin/commit/c365643ad521f9809baa6614a7389e99cbd0ce82))
* **deps-dev:** bump mocha from 8.3.2 to 8.4.0 ([528356b](https://github.com/wmfs/tymly-cardscript-plugin/commit/528356bec7e62bae041a8643756a028bac37a23a))

## [1.27.2](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.27.1...v1.27.2) (2021-04-07)


### 🐛 Bug Fixes

* set audit false [ch5157] ([6f6bbfd](https://github.com/wmfs/tymly-cardscript-plugin/commit/6f6bbfdd0999a0294db16afb4c3feaf1c901e104))
* set audit false [ch5157] ([755cc57](https://github.com/wmfs/tymly-cardscript-plugin/commit/755cc57d6ea3085dd9d86d0d4bb8e58026c0ddb5))
* set audit false [ch5157] ([479318f](https://github.com/wmfs/tymly-cardscript-plugin/commit/479318f0402d3f52b28371106a231b3e8e288cf3))


### 🛠 Builds

* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.192.0 to 1.193.0 ([60e55ee](https://github.com/wmfs/tymly-cardscript-plugin/commit/60e55eee87cdac92133be42bdb3e56e3186e5588))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.193.0 to 1.194.0 ([e68ca57](https://github.com/wmfs/tymly-cardscript-plugin/commit/e68ca57965c32e7136c4c8c2c6670fc8a3042cca))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.194.0 to 1.195.0 ([783b880](https://github.com/wmfs/tymly-cardscript-plugin/commit/783b8805bcd652551c2f9dae9efa4ecafdf9ca95))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.245.0 to 1.246.0 ([69fa982](https://github.com/wmfs/tymly-cardscript-plugin/commit/69fa9824ce10bb67e1fee406ed9e8fbd0cfa6d3b))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.21.0 to 2.22.0 ([9629435](https://github.com/wmfs/tymly-cardscript-plugin/commit/96294354f44836c819f7416b9c38405c75ffcd55))
* **deps-dev:** bump chai from 4.3.1 to 4.3.2 ([9589eaf](https://github.com/wmfs/tymly-cardscript-plugin/commit/9589eaf4444d1150df0e54f192e02baec59fd8c8))
* **deps-dev:** bump chai from 4.3.2 to 4.3.3 ([3a6c967](https://github.com/wmfs/tymly-cardscript-plugin/commit/3a6c96740bb12645b47656717042e6add09cba0c))
* **deps-dev:** bump chai from 4.3.3 to 4.3.4 ([838e1f7](https://github.com/wmfs/tymly-cardscript-plugin/commit/838e1f7d23397849ebccc1372fd410c297946a72))
* **deps-dev:** bump mocha from 8.3.0 to 8.3.1 ([a16fa05](https://github.com/wmfs/tymly-cardscript-plugin/commit/a16fa0597a56722d9ec9222f1da487a5eb62d2b6))
* **deps-dev:** bump mocha from 8.3.1 to 8.3.2 ([446487a](https://github.com/wmfs/tymly-cardscript-plugin/commit/446487a4838efa45a7224c404bd3da307f02be00))
* **deps-dev:** bump semantic-release from 17.4.0 to 17.4.1 ([066e3e1](https://github.com/wmfs/tymly-cardscript-plugin/commit/066e3e17f9fd518265369867f178ab7b3b2e5cb0))
* **deps-dev:** bump semantic-release from 17.4.1 to 17.4.2 ([898e2b6](https://github.com/wmfs/tymly-cardscript-plugin/commit/898e2b63aa6a6b72e7734f11993de5881fd6011f))


### ⚙️ Continuous Integrations

* **circle:** update postgres config to 13.2 ([ad92e34](https://github.com/wmfs/tymly-cardscript-plugin/commit/ad92e340545be4b4a388690d8f3be244e9b218e1))

## [1.27.1](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.27.0...v1.27.1) (2021-03-03)


### 🐛 Bug Fixes

* Refresh user roles on remit ([ad0e275](https://github.com/wmfs/tymly-cardscript-plugin/commit/ad0e2750ef6f5a126f4af8ae7e6feecd96b3ddc3))


### 🛠 Builds

* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.188.0 to 1.189.0 ([c55e903](https://github.com/wmfs/tymly-cardscript-plugin/commit/c55e90327cb36e2f7778fd9cde61296be1b3275d))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.189.0 to 1.192.0 ([ebc6137](https://github.com/wmfs/tymly-cardscript-plugin/commit/ebc61374dd57b5082e9b92dd4bb1b4a3e97163b0))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.244.0 to 1.245.0 ([df839cd](https://github.com/wmfs/tymly-cardscript-plugin/commit/df839cdc007174ff3737f968a5a07b90c2ed2c7e))
* **deps-dev:** bump chai from 4.3.0 to 4.3.1 ([82ad8cc](https://github.com/wmfs/tymly-cardscript-plugin/commit/82ad8ccdaa8a4c2e2d274ee17b9dd38730a90b38))
* **deps-dev:** bump semantic-release from 17.3.9 to 17.4.0 ([cc2b183](https://github.com/wmfs/tymly-cardscript-plugin/commit/cc2b18303da3014828722121f3315c8615f078eb))

# [1.27.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.26.0...v1.27.0) (2021-02-24)


### 🛠 Builds

* **deps:** bump [@wmfs](https://github.com/wmfs)/form-maker from 1.7.0 to 1.8.0 ([ce7ae55](https://github.com/wmfs/tymly-cardscript-plugin/commit/ce7ae55fb2b42ab0f9a0fe0bd737f21689c53887))
* **deps:** bump lodash from 4.17.20 to 4.17.21 ([bc51de2](https://github.com/wmfs/tymly-cardscript-plugin/commit/bc51de2d02f0bf8e3828e4d8248622a56f63d26f))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.184.0 to 1.185.0 ([03dd137](https://github.com/wmfs/tymly-cardscript-plugin/commit/03dd13777c12ae2de3c6e60d527d8a3557f670e7))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.185.0 to 1.186.0 ([8bb12fb](https://github.com/wmfs/tymly-cardscript-plugin/commit/8bb12fbbd408bd7bcc21553986148f8c9cc6fa70))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.186.0 to 1.187.0 ([8f772d7](https://github.com/wmfs/tymly-cardscript-plugin/commit/8f772d7da9b15e8f316ab465962a0f33af65a243))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.187.0 to 1.188.0 ([f8c8e25](https://github.com/wmfs/tymly-cardscript-plugin/commit/f8c8e25497a106949a33147eb95ba00d5de48187))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.236.0 to 1.238.0 ([0216764](https://github.com/wmfs/tymly-cardscript-plugin/commit/02167649fb5d6b84ae038138bdaa215b5e3f1088))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.238.0 to 1.239.0 ([a56cf24](https://github.com/wmfs/tymly-cardscript-plugin/commit/a56cf246e4d6b79a31c17b56c973df1b70cab5f9))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.239.0 to 1.240.0 ([83062b2](https://github.com/wmfs/tymly-cardscript-plugin/commit/83062b2eaa7ede3393c3f47921c1bb6d1ab6fc58))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.240.0 to 1.241.0 ([65f5d0b](https://github.com/wmfs/tymly-cardscript-plugin/commit/65f5d0bc32b948b0354e94773545d5ee7a782b08))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.241.0 to 1.242.0 ([bf21918](https://github.com/wmfs/tymly-cardscript-plugin/commit/bf21918c65e9014c9b6ec0902bc6e33d91315f0e))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.242.0 to 1.244.0 ([3208b2e](https://github.com/wmfs/tymly-cardscript-plugin/commit/3208b2e00a8058d93b9f3728b001d5cb7e0d7051))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.19.0 to 2.20.0 ([87681d4](https://github.com/wmfs/tymly-cardscript-plugin/commit/87681d4572979068f290a8b15f8150102268f8ab))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.20.0 to 2.21.0 ([8e4daa0](https://github.com/wmfs/tymly-cardscript-plugin/commit/8e4daa07ab2ea2c08a854ecb38209f66cbf0f7de))
* **deps-dev:** bump chai from 4.2.0 to 4.3.0 ([92890c9](https://github.com/wmfs/tymly-cardscript-plugin/commit/92890c95158641e12d6de257de724278871c39e3))
* **deps-dev:** bump mocha from 8.2.1 to 8.3.0 ([88f1bef](https://github.com/wmfs/tymly-cardscript-plugin/commit/88f1befcf8c57b6dec30c1cf7e34a622d49c8c1f))
* **deps-dev:** bump semantic-release from 17.3.3 to 17.3.4 ([0f44505](https://github.com/wmfs/tymly-cardscript-plugin/commit/0f44505a30334676afabf588845a8418fa26eb21))
* **deps-dev:** bump semantic-release from 17.3.4 to 17.3.5 ([a50ba1c](https://github.com/wmfs/tymly-cardscript-plugin/commit/a50ba1c9d8f4cc12369d44b833ae634047f02e48))
* **deps-dev:** bump semantic-release from 17.3.5 to 17.3.6 ([242237a](https://github.com/wmfs/tymly-cardscript-plugin/commit/242237a513ed752fcd61b1113cb6acd699d19595))
* **deps-dev:** bump semantic-release from 17.3.6 to 17.3.7 ([a3d6016](https://github.com/wmfs/tymly-cardscript-plugin/commit/a3d6016a29af824355bdaa405191f655b4d5c725))
* **deps-dev:** bump semantic-release from 17.3.7 to 17.3.8 ([934bbe3](https://github.com/wmfs/tymly-cardscript-plugin/commit/934bbe37dd3c8399607be332e7dede432049ebbc))
* **deps-dev:** bump semantic-release from 17.3.8 to 17.3.9 ([888f0ff](https://github.com/wmfs/tymly-cardscript-plugin/commit/888f0ff3b9bdd716d43c06de248e169cd2d2bc9e))

# [1.26.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.25.0...v1.26.0) (2021-01-19)


### 🛠 Builds

* **deps:** bump jsonpath from 1.0.2 to 1.1.0 ([6934fe3](https://github.com/wmfs/tymly-cardscript-plugin/commit/6934fe34932095cebe06836e734b12d33e7b5220))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.26.0 to 1.27.0 ([d7573ce](https://github.com/wmfs/tymly-cardscript-plugin/commit/d7573cef52cc84eb1a1ede92b7065cf04be998d8))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.183.0 to 1.184.0 ([a0ec647](https://github.com/wmfs/tymly-cardscript-plugin/commit/a0ec6474a6cbc19fbdef9b1f1478343c7a60b6c1))
* **deps-dev:** bump semantic-release from 17.3.1 to 17.3.2 ([9031517](https://github.com/wmfs/tymly-cardscript-plugin/commit/9031517359131b69db76a44d878dd4ed2a4872c1))
* **deps-dev:** bump semantic-release from 17.3.2 to 17.3.3 ([c948e22](https://github.com/wmfs/tymly-cardscript-plugin/commit/c948e22914d18188ed1bfaf940fe851e447d8206))

# [1.25.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.24.0...v1.25.0) (2021-01-12)


### 🛠 Builds

* **deps:** bump uuid from 8.3.1 to 8.3.2 ([2b4dc5d](https://github.com/wmfs/tymly-cardscript-plugin/commit/2b4dc5d00da7378cb933092df9588fcc10d46ba4))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.179.0 to 1.180.0 ([fe4dc6b](https://github.com/wmfs/tymly-cardscript-plugin/commit/fe4dc6b4a6d6b9c1972cbd3489d595cc43375a19))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.180.0 to 1.181.0 ([118ecae](https://github.com/wmfs/tymly-cardscript-plugin/commit/118ecaeb1f526898185da847f6df27a6e3321771))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.181.0 to 1.182.0 ([23dfc46](https://github.com/wmfs/tymly-cardscript-plugin/commit/23dfc4682e9d5ef3b46525289923e2224615516c))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.182.0 to 1.183.0 ([09f94cb](https://github.com/wmfs/tymly-cardscript-plugin/commit/09f94cbeccdaf9d0ac005723069ce245a6592c4e))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.234.0 to 1.235.0 ([810af5e](https://github.com/wmfs/tymly-cardscript-plugin/commit/810af5e680c514b72457569f2e8a8f953e5a86d9))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.235.0 to 1.236.0 ([b1a2d3b](https://github.com/wmfs/tymly-cardscript-plugin/commit/b1a2d3bec0dc4f5650f33dac4fdc44e536e14e1f))
* **deps-dev:** bump standard from 15.0.1 to 16.0.3 ([f995db4](https://github.com/wmfs/tymly-cardscript-plugin/commit/f995db4a4dc880fc66aea2bea81dc037b695111d))


### 📦 Code Refactoring

* standard linting ([8b8e827](https://github.com/wmfs/tymly-cardscript-plugin/commit/8b8e827b8af823a43f3f62dd406d94a510b8340c))

# [1.24.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.23.0...v1.24.0) (2021-01-06)


### 🛠 Builds

* **deps:** bump jsonfile from 6.0.1 to 6.1.0 ([697491a](https://github.com/wmfs/tymly-cardscript-plugin/commit/697491abbbdbbce681fdb6490bed60fbc22a5716))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.25.0 to 1.26.0 ([8902c5c](https://github.com/wmfs/tymly-cardscript-plugin/commit/8902c5c6b5fea1445698deecb95b7f83dcd89e80))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.176.1 to 1.178.0 ([3cb5252](https://github.com/wmfs/tymly-cardscript-plugin/commit/3cb5252d6aac100ece40bf763e910827a2167c06))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.178.0 to 1.179.0 ([096a978](https://github.com/wmfs/tymly-cardscript-plugin/commit/096a9784eb3f1b9ac6181e53af856d1a91d7863c))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.233.0 to 1.234.0 ([01e6603](https://github.com/wmfs/tymly-cardscript-plugin/commit/01e66031e3058217594f271abcb064acca7bd3ff))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.18.0 to 2.19.0 ([f6876c3](https://github.com/wmfs/tymly-cardscript-plugin/commit/f6876c3c3929b79e6767fcb333d5ef39b438076d))

# [1.23.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.22.0...v1.23.0) (2021-01-05)


### 🛠 Builds

* **deps:** bump debug from 4.2.0 to 4.3.1 ([65d3230](https://github.com/wmfs/tymly-cardscript-plugin/commit/65d32309be41bf96ac832fa4a1ce149ad5e585ad))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.174.0 to 1.174.1 ([b25a162](https://github.com/wmfs/tymly-cardscript-plugin/commit/b25a1621cff112d3a84430c6491e9921dd204f1d))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.174.1 to 1.175.0 ([5c7bf4d](https://github.com/wmfs/tymly-cardscript-plugin/commit/5c7bf4d461f08260f3dade63b2fbc528f494796f))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.175.0 to 1.176.0 ([74879d6](https://github.com/wmfs/tymly-cardscript-plugin/commit/74879d6c9fe7904e9c176c7f97850b42d90028ca))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.176.0 to 1.176.1 ([9621431](https://github.com/wmfs/tymly-cardscript-plugin/commit/96214313e0427978b9cab3c24b39087c9ef1f73e))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.16.0 to 2.17.0 ([a1587bb](https://github.com/wmfs/tymly-cardscript-plugin/commit/a1587bbfd6fd72b3ff5e2aa2c66af1e10c401e56))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.17.0 to 2.17.1 ([7a188c5](https://github.com/wmfs/tymly-cardscript-plugin/commit/7a188c53db3f2a28bc048c3170051c2c355f85f6))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.17.1 to 2.18.0 ([68a307a](https://github.com/wmfs/tymly-cardscript-plugin/commit/68a307a4eaf1358fa5a5e6ee792e47e9000a6223))
* **deps-dev:** bump semantic-release from 17.3.0 to 17.3.1 ([f9ca134](https://github.com/wmfs/tymly-cardscript-plugin/commit/f9ca1349005d567950f7b94cd6e3c1c912ecb91b))

# [1.22.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.21.0...v1.22.0) (2020-12-03)


### ✨ Features

* append todo ID on todo entry ([75579ef](https://github.com/wmfs/tymly-cardscript-plugin/commit/75579ef85ecb5e3f446c4e7281b5a8eb71f28e85))


### 🐛 Bug Fixes

* better to generate the id beforehand ([527c0e5](https://github.com/wmfs/tymly-cardscript-plugin/commit/527c0e568630a9c84f57f3fb028ce9d4d22780a5))
* return object in array map ([2d3d968](https://github.com/wmfs/tymly-cardscript-plugin/commit/2d3d96834d3934347a59d9273a11c84e2eaf3a18))


### 🛠 Builds

* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.23.0 to 1.25.0 ([74d63d2](https://github.com/wmfs/tymly-cardscript-plugin/commit/74d63d26c4ffc79bb033dd2fdc910141892e5f80))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.160.0 to 1.162.0 ([9f6b942](https://github.com/wmfs/tymly-cardscript-plugin/commit/9f6b942afb1cfa9875286543783565760306d7e6))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.162.0 to 1.164.0 ([311e27b](https://github.com/wmfs/tymly-cardscript-plugin/commit/311e27b9c73aa8fbae6a02d5f87aad10065e1d2d))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.164.0 to 1.165.0 ([33dd55c](https://github.com/wmfs/tymly-cardscript-plugin/commit/33dd55caf4f67456563ce815cf42fd98c74d95ca))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.165.0 to 1.166.0 ([9cd7364](https://github.com/wmfs/tymly-cardscript-plugin/commit/9cd73642b4c5f7485e13e9dd1d2072da1c60b3d5))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.166.0 to 1.169.0 ([1bcf884](https://github.com/wmfs/tymly-cardscript-plugin/commit/1bcf88473577197019543c962aa8ef015643fd1e))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.169.0 to 1.170.0 ([a53837a](https://github.com/wmfs/tymly-cardscript-plugin/commit/a53837a4cb22fba9a7b305e0245fd7bded343b12))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.170.0 to 1.171.0 ([68b806d](https://github.com/wmfs/tymly-cardscript-plugin/commit/68b806d1fdfff1bc0f880e051d912b2e883b1d7d))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.171.0 to 1.172.0 ([f648693](https://github.com/wmfs/tymly-cardscript-plugin/commit/f648693165b301d889153bb293bce934bc64bb19))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.172.0 to 1.173.0 ([b8031c3](https://github.com/wmfs/tymly-cardscript-plugin/commit/b8031c33f06c1205b180b2e4ce9e54dfb920bd80))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.173.0 to 1.174.0 ([88aa63d](https://github.com/wmfs/tymly-cardscript-plugin/commit/88aa63d72753278f1eb117d6d52afe45f0da83d4))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.225.2 to 1.227.0 ([c22d193](https://github.com/wmfs/tymly-cardscript-plugin/commit/c22d193a0c517780ed8d81710cc41293db861a52))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.227.0 to 1.230.0 ([db05d97](https://github.com/wmfs/tymly-cardscript-plugin/commit/db05d97c782d7a133d8358d2c4d8411e6a3edbbc))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.230.0 to 1.231.0 ([285f781](https://github.com/wmfs/tymly-cardscript-plugin/commit/285f781facece8b0b7c2a5a201299a07527078f1))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.231.0 to 1.232.0 ([ae84dc8](https://github.com/wmfs/tymly-cardscript-plugin/commit/ae84dc8ae15ecd470e61618c2af0be9142dfe64c))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.232.0 to 1.233.0 ([f98ba06](https://github.com/wmfs/tymly-cardscript-plugin/commit/f98ba06de9615e49cf5b37e11783330db7d08852))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.13.0 to 2.14.0 ([15dd5fb](https://github.com/wmfs/tymly-cardscript-plugin/commit/15dd5fb26001e547c5577a7679a06df38f7f8a0e))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.14.0 to 2.15.0 ([c330611](https://github.com/wmfs/tymly-cardscript-plugin/commit/c33061158f6653da5dd6b0a27f448e58223ea113))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.15.0 to 2.16.0 ([4e96bb7](https://github.com/wmfs/tymly-cardscript-plugin/commit/4e96bb7d881a357a24d31071df3b6fc932711ebe))
* **deps-dev:** bump codecov from 3.7.2 to 3.8.0 ([81d85a1](https://github.com/wmfs/tymly-cardscript-plugin/commit/81d85a1476d9bb0959fdc9c002282af248e9d9d3))
* **deps-dev:** bump codecov from 3.8.0 to 3.8.1 ([d8deb63](https://github.com/wmfs/tymly-cardscript-plugin/commit/d8deb63df3ca2370d7b8fe81982a6dd5c332bff1))
* **deps-dev:** bump mocha from 8.1.3 to 8.2.1 ([786abb6](https://github.com/wmfs/tymly-cardscript-plugin/commit/786abb613e7ae707b29bc54531b49d0ae04a6e53))
* **deps-dev:** bump semantic-release from 17.1.2 to 17.2.0 ([5255ed2](https://github.com/wmfs/tymly-cardscript-plugin/commit/5255ed2bb3e2c5f1b3c4ebefc90713183d7e7cd4))
* **deps-dev:** bump semantic-release from 17.2.0 to 17.2.1 ([dfe5bba](https://github.com/wmfs/tymly-cardscript-plugin/commit/dfe5bba4c04345dbecf080ecf88adcf1fe8b7a23))
* **deps-dev:** bump semantic-release from 17.2.1 to 17.2.2 ([7d61e85](https://github.com/wmfs/tymly-cardscript-plugin/commit/7d61e85ad04a8fea9605641d223f577405cce4a9))
* **deps-dev:** bump semantic-release from 17.2.2 to 17.2.3 ([6e4ab5f](https://github.com/wmfs/tymly-cardscript-plugin/commit/6e4ab5f97faa4cee53c3d25d19275b1a31c11bd3))
* **deps-dev:** bump semantic-release from 17.2.3 to 17.2.4 ([d708bb6](https://github.com/wmfs/tymly-cardscript-plugin/commit/d708bb67b513d2d91fdf9d3cff112f263196d985))
* **deps-dev:** bump semantic-release from 17.2.4 to 17.3.0 ([23333bb](https://github.com/wmfs/tymly-cardscript-plugin/commit/23333bbae3cadc9ead75825f7e2a98b38a1473ab))
* **deps-dev:** bump standard from 14.3.4 to 15.0.0 ([262f6bc](https://github.com/wmfs/tymly-cardscript-plugin/commit/262f6bccea4595869ed5c1355c998596b3f769bb))
* **deps-dev:** bump standard from 15.0.0 to 15.0.1 ([29f2288](https://github.com/wmfs/tymly-cardscript-plugin/commit/29f2288836a85124c8d9f1114a721dbad796c809))


### 📦 Code Refactoring

* remove standard from npm test script [skip ci] ([c7bc0d5](https://github.com/wmfs/tymly-cardscript-plugin/commit/c7bc0d52e0f287e7acb5adf7f23b86dfe41ae715))


### 🚨 Tests

* update expected categories ([3ac5f31](https://github.com/wmfs/tymly-cardscript-plugin/commit/3ac5f3111eb4a346af59dd01a8e6574835c1e176))
* update expected categories ([fc6de07](https://github.com/wmfs/tymly-cardscript-plugin/commit/fc6de0726724c020f55aae78219a44f97eab4b0c))


### ⚙️ Continuous Integrations

* **circle:** add parallelism ([45a4f78](https://github.com/wmfs/tymly-cardscript-plugin/commit/45a4f780eabfd278ba78c67d7131cc4924615d01))
* **circle:** add parallelism for unit tests [ch2766] ([b0c90cf](https://github.com/wmfs/tymly-cardscript-plugin/commit/b0c90cfe49f63b95becdc4ff55e4680005aa61fa))
* **circle:** auth dockerhub ([b0baf73](https://github.com/wmfs/tymly-cardscript-plugin/commit/b0baf73d76802dd29ddf4c32f67abe7ec951593a))
* **circle:** authenticate Docker image pull [ch2767] ([385160f](https://github.com/wmfs/tymly-cardscript-plugin/commit/385160fb79e63032950bf3618fc13a670a8a385b))
* **circle:** cache dependencies ([0658dd4](https://github.com/wmfs/tymly-cardscript-plugin/commit/0658dd47b77472cb139b2310fa65ad6b1ec50b67))
* **circle:** cache dependencies [ch2770] ([0fe11ea](https://github.com/wmfs/tymly-cardscript-plugin/commit/0fe11ea7c9e49885eaf1c7f5f91facaca6b9176d))
* **circle:** cache dependencies in release job ([0327b05](https://github.com/wmfs/tymly-cardscript-plugin/commit/0327b05826e75b881fd1e068a255278b65a00884))
* **circle:** separate lint job [ch1009] ([9e3877b](https://github.com/wmfs/tymly-cardscript-plugin/commit/9e3877b873e65ac1ee31367cc3a95445dfea6193))
* **circle:** try 2 parallelism ([a59d911](https://github.com/wmfs/tymly-cardscript-plugin/commit/a59d9118d89289a57d8116d937eecbd6ba73d90c))
* **circle:** update build environment variable context name [ch2771] ([238c5b3](https://github.com/wmfs/tymly-cardscript-plugin/commit/238c5b3f6f84e2497489a2ad1160c7795ab003bb))
* **circle:** use tmpfs postgres image ([4084201](https://github.com/wmfs/tymly-cardscript-plugin/commit/4084201d9de30d12e24fc8a19aac632fd6e9dd8e))


### ♻️ Chores

* update docs ([d54ddee](https://github.com/wmfs/tymly-cardscript-plugin/commit/d54ddeeb57ed5f25cccd6db25640595ff26b59ca))

# [1.21.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.20.0...v1.21.0) (2020-09-28)


### 🛠 Builds

* **deps:** bump [@wmfs](https://github.com/wmfs)/form-maker from 1.6.0 to 1.7.0 ([34287b0](https://github.com/wmfs/tymly-cardscript-plugin/commit/34287b0d5a79ac39cce8cfdbb24c9e53e79d2074))

# [1.20.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.19.0...v1.20.0) (2020-09-28)


### 🛠 Builds

* **deps:** bump debug from 4.1.1 to 4.2.0 ([3b9fa3e](https://github.com/wmfs/tymly-cardscript-plugin/commit/3b9fa3e8f8a079ec3d448a3efe5cf00eb039ba5e))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.225.1 to 1.225.2 ([a1ff5a2](https://github.com/wmfs/tymly-cardscript-plugin/commit/a1ff5a28692abcb5ebea08dac8117d51bfe9d95a))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-test-helpers from 1.6.0 to 1.7.0 ([84488d1](https://github.com/wmfs/tymly-cardscript-plugin/commit/84488d199bd4415b1c0848705189fe4f92dd0b7f))
* **deps-dev:** bump semantic-release from 17.1.1 to 17.1.2 ([dadd4cf](https://github.com/wmfs/tymly-cardscript-plugin/commit/dadd4cf94b7757f959c85e693b9d9288894eeca0))

# [1.19.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.18.0...v1.19.0) (2020-09-09)


### ✨ Features

* Card template preprocessor support ([f7a3175](https://github.com/wmfs/tymly-cardscript-plugin/commit/f7a317521bbe0d8009e00d6b9b98a8f3e5d38edb))


### 🐛 Bug Fixes

* Initialise cardPreprocessors member when no blueprints have preprocessors defined. ([05a7a68](https://github.com/wmfs/tymly-cardscript-plugin/commit/05a7a68619887fa74c90295636da7efd63738a62))


### 🛠 Builds

* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.22.0 to 1.23.0 ([4bf2261](https://github.com/wmfs/tymly-cardscript-plugin/commit/4bf226157e73ad2f8b12da4c30d0e0fbcd505b88))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.154.0 to 1.156.0 ([03dbb26](https://github.com/wmfs/tymly-cardscript-plugin/commit/03dbb262824dfcaae92cc646f2e450436e6e1bee))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.156.0 to 1.157.0 ([548d67c](https://github.com/wmfs/tymly-cardscript-plugin/commit/548d67c5fe3b14f32e6e925c34b7ee950667a598))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.157.0 to 1.159.0 ([e94161f](https://github.com/wmfs/tymly-cardscript-plugin/commit/e94161f76bb6c4b87ba81047a7e20f8ac1cd20e8))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.159.0 to 1.160.0 ([ddfef99](https://github.com/wmfs/tymly-cardscript-plugin/commit/ddfef99b5ba1b5c4052ba3865d46c0891b4852cf))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.215.1 to 1.216.0 ([68c4f4a](https://github.com/wmfs/tymly-cardscript-plugin/commit/68c4f4aac5aef4e3ed46a78f5adc96050874e99e))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.216.0 to 1.223.0 ([b21e6da](https://github.com/wmfs/tymly-cardscript-plugin/commit/b21e6da4e1ed8bb2db2cc3742f59593adafabe05))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.223.0 to 1.224.0 ([122e1be](https://github.com/wmfs/tymly-cardscript-plugin/commit/122e1be13b18e4ac7de7db5060c0089ec424a39a))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.224.0 to 1.225.0 ([5af3a74](https://github.com/wmfs/tymly-cardscript-plugin/commit/5af3a745ed1de80396afd44a76efe17e0e55c1d5))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.225.0 to 1.225.1 ([a80496c](https://github.com/wmfs/tymly-cardscript-plugin/commit/a80496c2606406dde32576808bd5ce90efe9ed02))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.11.0 to 2.12.0 ([e9c33d9](https://github.com/wmfs/tymly-cardscript-plugin/commit/e9c33d93d1f863a28d76edc8d14ab9d524b4f9cf))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.12.0 to 2.13.0 ([5180f32](https://github.com/wmfs/tymly-cardscript-plugin/commit/5180f324ea48107be7bc150cd253022dbcd7b232))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-test-helpers from 1.4.2 to 1.6.0 ([de22449](https://github.com/wmfs/tymly-cardscript-plugin/commit/de22449fc13296e712578b11f2537ff801420b18))
* **deps-dev:** bump cz-conventional-changelog from 3.2.0 to 3.2.1 ([e7fd081](https://github.com/wmfs/tymly-cardscript-plugin/commit/e7fd08187c2365a7c37dba41bd58815118f0a15b))
* **deps-dev:** bump cz-conventional-changelog from 3.2.1 to 3.3.0 ([3d21f8d](https://github.com/wmfs/tymly-cardscript-plugin/commit/3d21f8d1d14d1179846f7cddb5bd407d2c9a26ec))
* **deps-dev:** bump mocha from 8.1.1 to 8.1.2 ([99c698a](https://github.com/wmfs/tymly-cardscript-plugin/commit/99c698ae3f4ef88f0a69052ff049bd5e0aa578a4))
* **deps-dev:** bump mocha from 8.1.2 to 8.1.3 ([a91e7a9](https://github.com/wmfs/tymly-cardscript-plugin/commit/a91e7a952e0482d2d8d08dfbfd44105244116a22))

# [1.18.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.17.0...v1.18.0) (2020-08-17)


### 🛠 Builds

* **deps:** bump lodash from 4.17.19 to 4.17.20 ([b1d51d9](https://github.com/wmfs/tymly-cardscript-plugin/commit/b1d51d901274965ff41a9bfc3c48cfb4270cd7e1))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.153.0 to 1.154.0 ([14d5b82](https://github.com/wmfs/tymly-cardscript-plugin/commit/14d5b82c9cda64c9bec5546dfa8933a8476dc555))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.215.0 to 1.215.1 ([0d00bef](https://github.com/wmfs/tymly-cardscript-plugin/commit/0d00bef6805d10223ddb77cafa0cc5399df347f4))
* **deps-dev:** bump codecov from 3.7.1 to 3.7.2 ([b5ba668](https://github.com/wmfs/tymly-cardscript-plugin/commit/b5ba668be5b8e2061e435ff28a591a5e6ac65720))
* **deps-dev:** bump mocha from 8.0.1 to 8.1.0 ([dde13d7](https://github.com/wmfs/tymly-cardscript-plugin/commit/dde13d7149d16ec6266060e894a5016a23fc63a7))
* **deps-dev:** bump mocha from 8.1.0 to 8.1.1 ([fe0f01e](https://github.com/wmfs/tymly-cardscript-plugin/commit/fe0f01e78bb3d01be243fc6e395ce3eaafde3969))

# [1.17.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.16.0...v1.17.0) (2020-07-20)


### 🛠 Builds

* **deps:** bump [@wmfs](https://github.com/wmfs)/form-maker from 1.5.0 to 1.6.0 ([527c455](https://github.com/wmfs/tymly-cardscript-plugin/commit/527c455fef46c41592ba59a9c042110298c07452))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.150.0 to 1.152.0 ([31abe8e](https://github.com/wmfs/tymly-cardscript-plugin/commit/31abe8e683256676abd1371e9b9f784afb17c7fd))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.152.0 to 1.153.0 ([084514e](https://github.com/wmfs/tymly-cardscript-plugin/commit/084514e0af4173dffcbb310398b19eb731fa398e))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.210.0 to 1.214.0 ([e834b33](https://github.com/wmfs/tymly-cardscript-plugin/commit/e834b33c38509fd8bc984195ee7bcb6bac9ffb08))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.214.0 to 1.215.0 ([50cd441](https://github.com/wmfs/tymly-cardscript-plugin/commit/50cd441e006df5ee65da139dc9df60856838a02f))
* **deps-dev:** bump codecov from 3.7.0 to 3.7.1 ([24ac82b](https://github.com/wmfs/tymly-cardscript-plugin/commit/24ac82b73219871ac0e32a8548c4219e7e73251a))

# [1.16.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.15.0...v1.16.0) (2020-07-16)


### 🛠 Builds

* **deps:** bump [@wmfs](https://github.com/wmfs)/form-maker from 1.4.0 to 1.5.0 ([308b05f](https://github.com/wmfs/tymly-cardscript-plugin/commit/308b05fee45688125ad06c8d0bb07de6b93420d7))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.21.0 to 1.22.0 ([0d4cfed](https://github.com/wmfs/tymly-cardscript-plugin/commit/0d4cfed9f4199bc7990375ea4294fe0beaf32883))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.146.0 to 1.148.0 ([afcf76d](https://github.com/wmfs/tymly-cardscript-plugin/commit/afcf76d9c3cabf4888c6753e52df7203350b222b))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.148.0 to 1.149.0 ([da93b5d](https://github.com/wmfs/tymly-cardscript-plugin/commit/da93b5d565a3ec3747fa523b82929e9ca494d53f))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.149.0 to 1.150.0 ([4330480](https://github.com/wmfs/tymly-cardscript-plugin/commit/43304804d27cf51f44c1694fc36c80775e77dbe0))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.207.0 to 1.208.0 ([0085aa7](https://github.com/wmfs/tymly-cardscript-plugin/commit/0085aa7db1e249168a08d68e78d097fbdc2bff6e))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.208.0 to 1.210.0 ([b215fd5](https://github.com/wmfs/tymly-cardscript-plugin/commit/b215fd5e811385ee540dce47f30d1da97b895d70))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.10.0 to 2.11.0 ([5a7ff6d](https://github.com/wmfs/tymly-cardscript-plugin/commit/5a7ff6d4b1a6d4b4a2a76eff8e3ac09e5f18a1ad))

# [1.15.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.14.0...v1.15.0) (2020-07-13)


### 🛠 Builds

* **deps:** bump lodash from 4.17.15 to 4.17.19 ([3641886](https://github.com/wmfs/tymly-cardscript-plugin/commit/364188686a41de5da58e9f27aaf4fb38f0a21819))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.144.0 to 1.145.0 ([a8ca08c](https://github.com/wmfs/tymly-cardscript-plugin/commit/a8ca08c679249922a8da781a547353e8ea7b7964))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.145.0 to 1.146.0 ([bc199b0](https://github.com/wmfs/tymly-cardscript-plugin/commit/bc199b0ccb64700c19b39d9975f8fbfd0e315d38))
* **deps-dev:** bump semantic-release from 17.0.8 to 17.1.0 ([593e381](https://github.com/wmfs/tymly-cardscript-plugin/commit/593e381c5d310725841d7d8030ef29300bdc1059))
* **deps-dev:** bump semantic-release from 17.1.0 to 17.1.1 ([ee7cdf1](https://github.com/wmfs/tymly-cardscript-plugin/commit/ee7cdf164c64aef8d91afb88859c5b37443f303a))


### ⚙️ Continuous Integrations

* **circle:** use updated circle node image [skip ci] ([adc24af](https://github.com/wmfs/tymly-cardscript-plugin/commit/adc24af640bc59fb69c09cec2d960d69a65eede6))

# [1.14.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.13.5...v1.14.0) (2020-06-17)


### ✨ Features

* Use shasum on card templates after tymly [ch1134] ([dd0b6c8](https://github.com/wmfs/tymly-cardscript-plugin/commit/dd0b6c85214e72d1193ff8d5f64a4f54578d1995))


### 🛠 Builds

* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.20.0 to 1.21.0 ([c6ec8c2](https://github.com/wmfs/tymly-cardscript-plugin/commit/c6ec8c27dd0a8749e3a4024be8ad6fcdf1afaa86))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.137.2 to 1.137.3 ([79b20ba](https://github.com/wmfs/tymly-cardscript-plugin/commit/79b20ba05b692950cda4b3d3b95df83a37523ab3))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.137.3 to 1.138.0 ([ff07b7f](https://github.com/wmfs/tymly-cardscript-plugin/commit/ff07b7f26fa1d0a0587ba0748f0d1dac8ed05aca))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.138.0 to 1.140.0 ([73924ab](https://github.com/wmfs/tymly-cardscript-plugin/commit/73924ab59cb32735b7e7e0329696989d77c7158b))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.140.0 to 1.141.0 ([c6318ca](https://github.com/wmfs/tymly-cardscript-plugin/commit/c6318cac5e4ff1fbe78dc42c2d19983e72bd9116))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.141.0 to 1.142.0 ([688efbd](https://github.com/wmfs/tymly-cardscript-plugin/commit/688efbde69f10f71894d120ae434eb9e055acab0))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.142.0 to 1.143.0 ([f02c2a1](https://github.com/wmfs/tymly-cardscript-plugin/commit/f02c2a197d551e30402f733fc8d6c93f648ef67c))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.143.0 to 1.144.0 ([b652c4d](https://github.com/wmfs/tymly-cardscript-plugin/commit/b652c4d023832951c923d9e0400926ef4d906356))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.195.4 to 1.201.0 ([c8c6ceb](https://github.com/wmfs/tymly-cardscript-plugin/commit/c8c6ceb167ccff9358bf7beedd47129d75966900))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.201.0 to 1.204.0 ([7addcf1](https://github.com/wmfs/tymly-cardscript-plugin/commit/7addcf188e9e5323eb3ceac4fb404ac3ca9d201c))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.204.0 to 1.206.0 ([636edcf](https://github.com/wmfs/tymly-cardscript-plugin/commit/636edcffbd3c767bff0fd3fe0d78efd986d1614c))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.206.0 to 1.207.0 ([b30ca9e](https://github.com/wmfs/tymly-cardscript-plugin/commit/b30ca9ef7f26f31c45c8cdb6dc2918ca1558281b))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.8.1 to 2.8.3 ([7f29db8](https://github.com/wmfs/tymly-cardscript-plugin/commit/7f29db8bd14a2a9f8aa40d51cf2f04c1ac001ad7))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.8.3 to 2.9.0 ([0572111](https://github.com/wmfs/tymly-cardscript-plugin/commit/0572111b3fa364e9ba5d61aa6017fd2adbde894d))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.9.0 to 2.10.0 ([7e371a4](https://github.com/wmfs/tymly-cardscript-plugin/commit/7e371a4bd249f517f45ac061cab6b118a94fed1a))
* **deps-dev:** bump codecov from 3.6.5 to 3.7.0 ([7965123](https://github.com/wmfs/tymly-cardscript-plugin/commit/7965123bb17038936e897aa8b5241ed940247c76))
* **deps-dev:** bump mocha from 7.1.2 to 7.2.0 ([0143ce9](https://github.com/wmfs/tymly-cardscript-plugin/commit/0143ce90c062caf1878a7c34edec245538462001))
* **deps-dev:** bump mocha from 7.2.0 to 8.0.1 ([f8c7914](https://github.com/wmfs/tymly-cardscript-plugin/commit/f8c7914f63ee7ce67dc2ba7b1354e0e060663d3a))
* **deps-dev:** bump nyc from 15.0.1 to 15.1.0 ([5e2dd11](https://github.com/wmfs/tymly-cardscript-plugin/commit/5e2dd1196fd2799f85fcde7a93a60e44aadbccda))
* **deps-dev:** bump semantic-release from 17.0.7 to 17.0.8 ([76aa859](https://github.com/wmfs/tymly-cardscript-plugin/commit/76aa859942f6b11b60bef2a267a7b373ab0e6f92))
* **deps-dev:** bump standard from 14.3.3 to 14.3.4 ([be63dbf](https://github.com/wmfs/tymly-cardscript-plugin/commit/be63dbfcd93b380081f381aedf47885d20365996))

## [1.13.5](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.13.4...v1.13.5) (2020-05-05)


### 🐛 Bug Fixes

* **cards-service:** Remove redundant boot callback parameter ([eebf2ff](https://github.com/wmfs/tymly-cardscript-plugin/commit/eebf2ff051adf04849e23842a710f5ea3b13ee4e))


### 🛠 Builds

* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.137.1 to 1.137.2 ([1142450](https://github.com/wmfs/tymly-cardscript-plugin/commit/114245092374d2a00b4df6f917ea5d006434afbd))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.195.3 to 1.195.4 ([6ee680e](https://github.com/wmfs/tymly-cardscript-plugin/commit/6ee680e9ca342c408eb5353d4f34e29d37282961))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-rbac-plugin from 1.17.2 to 1.17.3 ([aa8e611](https://github.com/wmfs/tymly-cardscript-plugin/commit/aa8e61118b8b25719a408ba30aed6432ef54ae02))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.8.0 to 2.8.1 ([97bbc65](https://github.com/wmfs/tymly-cardscript-plugin/commit/97bbc65c5930894aace8190a154aec048c81166d))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-test-helpers from 1.4.1 to 1.4.2 ([90281e2](https://github.com/wmfs/tymly-cardscript-plugin/commit/90281e21795aa86b3d1c6df1a9b3c3547243440c))
* **deps-dev:** bump cz-conventional-changelog from 3.1.0 to 3.2.0 ([fb332d4](https://github.com/wmfs/tymly-cardscript-plugin/commit/fb332d4cd0452442881f8be2bd8d5481958f7c55))

## [1.13.4](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.13.3...v1.13.4) (2020-04-30)


### 🐛 Bug Fixes

* return empty arrays if no long running tasks found ([c74b724](https://github.com/wmfs/tymly-cardscript-plugin/commit/c74b724cff2920d989d087a9cbd5cffaeef9c2d6))


### 🛠 Builds

* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.137.0 to 1.137.1 ([310f1cc](https://github.com/wmfs/tymly-cardscript-plugin/commit/310f1cc39661ea67fab41df5b8fc0c07b3ecf0b9))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.195.2 to 1.195.3 ([b746a47](https://github.com/wmfs/tymly-cardscript-plugin/commit/b746a47abc44f569dc32c363622109bd92a9cd22))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.7.2 to 2.8.0 ([3045ae4](https://github.com/wmfs/tymly-cardscript-plugin/commit/3045ae45730ed373dd7522655f47edd8ad0c85f4))
* **deps-dev:** bump mocha from 7.1.1 to 7.1.2 ([27ec1c4](https://github.com/wmfs/tymly-cardscript-plugin/commit/27ec1c4cbd240ed51714831d7f79eb98cbf3682e))


### 📦 Code Refactoring

* **tests:** await on statebox method calls ([0c16336](https://github.com/wmfs/tymly-cardscript-plugin/commit/0c163360997e84fed598619d021f1c412d4aed24))
* **tests:** Flip tymly.boot from callback style to async/await ([a4b72c2](https://github.com/wmfs/tymly-cardscript-plugin/commit/a4b72c216c207b1253bbdc537ac54ce1d2ea598c))

## [1.13.3](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.13.2...v1.13.3) (2020-04-21)


### 🐛 Bug Fixes

* **state-resource:** Remove done parameter from AwaitingHumanInput.run ([596ae11](https://github.com/wmfs/tymly-cardscript-plugin/commit/596ae110acac228610e73d986358dd5d0d0e8694))


### 🛠 Builds

* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.135.1 to 1.135.2 ([e265cbc](https://github.com/wmfs/tymly-cardscript-plugin/commit/e265cbc9584a787d7b615ccb01d2f2926a51ea96))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.135.2 to 1.136.0 ([04d3c69](https://github.com/wmfs/tymly-cardscript-plugin/commit/04d3c69c8a65bdb4f81719d396869cdcbfd47bbf))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.136.0 to 1.137.0 ([e086e53](https://github.com/wmfs/tymly-cardscript-plugin/commit/e086e53a5e052c1d02877657e50018fd81404969))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.195.1 to 1.195.2 ([aa4b316](https://github.com/wmfs/tymly-cardscript-plugin/commit/aa4b316b7a046affbe85f738526411aae7a5ba04))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-rbac-plugin from 1.17.1 to 1.17.2 ([19678d0](https://github.com/wmfs/tymly-cardscript-plugin/commit/19678d021f2ec10cfad9213e63117774661ca236))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.7.1 to 2.7.2 ([27d0439](https://github.com/wmfs/tymly-cardscript-plugin/commit/27d043981c80a7a682374d26e7b88376cbf1c6f2))
* **deps-dev:** bump semantic-release from 17.0.6 to 17.0.7 ([a9040fd](https://github.com/wmfs/tymly-cardscript-plugin/commit/a9040fd536cbc260108e458d1a922d3e1fa8d939))

## [1.13.2](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.13.1...v1.13.2) (2020-04-20)


### 🐛 Bug Fixes

* **state-resource:** Remove callback parameter from init method ([891c967](https://github.com/wmfs/tymly-cardscript-plugin/commit/891c967e254636d1e0b4a8536ff0030c4d34ac1b))


### 🛠 Builds

* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.195.0 to 1.195.1 ([468680a](https://github.com/wmfs/tymly-cardscript-plugin/commit/468680a7a9d8ec737a7592871af0c90c0016dbb5))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-rbac-plugin from 1.17.0 to 1.17.1 ([3b62394](https://github.com/wmfs/tymly-cardscript-plugin/commit/3b62394f46c522928f7887e9fffde2156f713670))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.7.0 to 2.7.1 ([4b98e06](https://github.com/wmfs/tymly-cardscript-plugin/commit/4b98e06bebeea2b35ee8fea1fb5b8cb423cbedc5))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-test-helpers from 1.4.0 to 1.4.1 ([622a9af](https://github.com/wmfs/tymly-cardscript-plugin/commit/622a9af1cae1822e080f78ca5f01e91fc6679f13))
* **deps-dev:** bump semantic-release from 17.0.4 to 17.0.5 ([cc70679](https://github.com/wmfs/tymly-cardscript-plugin/commit/cc706792559ca4e023e0d3d8e5362270a81144aa))
* **deps-dev:** bump semantic-release from 17.0.5 to 17.0.6 ([2809855](https://github.com/wmfs/tymly-cardscript-plugin/commit/28098552b160706060cb5bcee2ab9ec77559b587))

## [1.13.1](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.13.0...v1.13.1) (2020-04-16)


### 🐛 Bug Fixes

* **state-resources:** Remove redundant callback parameters from init methods ([d0a6bf1](https://github.com/wmfs/tymly-cardscript-plugin/commit/d0a6bf18948b22dcad8eed985b1cf0f78a028ca6))


### 🛠 Builds

* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.135.0 to 1.135.1 ([9d4c532](https://github.com/wmfs/tymly-cardscript-plugin/commit/9d4c532635dfad994282224a6d1520873281e128))

# [1.13.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.12.0...v1.13.0) (2020-04-16)


### ✨ Features

* ArchiveExecution state machine and resource. ([19dd058](https://github.com/wmfs/tymly-cardscript-plugin/commit/19dd0586a8391a6dd4406d036315b30379248719))
* Extend long running tasks list fields ([44c5bb6](https://github.com/wmfs/tymly-cardscript-plugin/commit/44c5bb6703f14c8bb159e8e96f9bc0e0fe29357b))
* Try to pull task title from the card template ([43c76cf](https://github.com/wmfs/tymly-cardscript-plugin/commit/43c76cffa03bd91925fe1178f9ce4131659924f8))


### 🐛 Bug Fixes

* ArchiveExecution state machine, and scaffolding for the state resource implementation ([0198559](https://github.com/wmfs/tymly-cardscript-plugin/commit/0198559df4fe43c7addb04634b3bb5e205c0eb0c))
* Include stopped when querying recently completed tasks ([6b14c9f](https://github.com/wmfs/tymly-cardscript-plugin/commit/6b14c9f34cd297a5bf62c4682fc71aaa0a83909b))
* Long-running tasks - should be in instigatorGroup app, but don't need to be use startable ([39ab88e](https://github.com/wmfs/tymly-cardscript-plugin/commit/39ab88eeefc7d0034a3615a2fc22f0c70324c58e))
* Return all the completed tasks, not just the most recent three. ([abd2b04](https://github.com/wmfs/tymly-cardscript-plugin/commit/abd2b0428f8e8644583a30fa2a452ed762f996aa))
* Use storage.currentUser() not context.userId. ([16e5e6a](https://github.com/wmfs/tymly-cardscript-plugin/commit/16e5e6aaa6653268d57f2b4b58cc4837c8502ef2))


### 🛠 Builds

* **deps-dev:** bump [@semantic-release](https://github.com/semantic-release)/changelog from 5.0.0 to 5.0.1 ([5c78fc6](https://github.com/wmfs/tymly-cardscript-plugin/commit/5c78fc6793639c6f0bf53792c6e483874f50ce90))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.18.0 to 1.19.0 ([39f0276](https://github.com/wmfs/tymly-cardscript-plugin/commit/39f0276d35b5035d662518818cba0b2a0a83b2e1))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.19.0 to 1.20.0 ([9df9994](https://github.com/wmfs/tymly-cardscript-plugin/commit/9df9994982e180fea93a653318f57754d6de8c00))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.126.2 to 1.127.0 ([5455406](https://github.com/wmfs/tymly-cardscript-plugin/commit/5455406c2159329612bf883416a7524038810fa5))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.127.0 to 1.128.0 ([63b0f50](https://github.com/wmfs/tymly-cardscript-plugin/commit/63b0f50f27a3b7e9aeda85f9c0f5ea10f69ef417))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.128.0 to 1.129.0 ([3c8171b](https://github.com/wmfs/tymly-cardscript-plugin/commit/3c8171bb91a10528d732d5f228aaf7a34d40768d))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.129.0 to 1.130.0 ([223b41a](https://github.com/wmfs/tymly-cardscript-plugin/commit/223b41a9507867a817feeed2213bd97b7ee9b2f5))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.130.0 to 1.131.0 ([bd9de8a](https://github.com/wmfs/tymly-cardscript-plugin/commit/bd9de8a4a0dce8f4e3816ec8a7634a05d977dcea))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.131.0 to 1.135.0 ([3b634e6](https://github.com/wmfs/tymly-cardscript-plugin/commit/3b634e659487d4fe2b7944899cf76243a135a62d))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.176.0 to 1.178.0 ([746bc47](https://github.com/wmfs/tymly-cardscript-plugin/commit/746bc474f517bf61d0d17405cc275871f578991b))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.178.0 to 1.179.0 ([c6905f4](https://github.com/wmfs/tymly-cardscript-plugin/commit/c6905f445a70d3503cedd76c931daaf0e06d3c17))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.179.0 to 1.181.0 ([7641157](https://github.com/wmfs/tymly-cardscript-plugin/commit/7641157e6a9c27555244356af6717019e333c2d3))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.181.0 to 1.183.0 ([51ad1ca](https://github.com/wmfs/tymly-cardscript-plugin/commit/51ad1ca2b3d7df6896a363bd225279bb8b409377))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.183.0 to 1.187.0 ([6a9cb01](https://github.com/wmfs/tymly-cardscript-plugin/commit/6a9cb01724972a32651a1b247e65bceb78402987))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.187.0 to 1.188.0 ([472229a](https://github.com/wmfs/tymly-cardscript-plugin/commit/472229a80bfb4db512edf851710df701c10b0782))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.188.0 to 1.189.0 ([6b681af](https://github.com/wmfs/tymly-cardscript-plugin/commit/6b681afd37650e1accfef5d9ea4bfcf521fa7e02))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.189.0 to 1.190.0 ([2197faa](https://github.com/wmfs/tymly-cardscript-plugin/commit/2197faa8f6c3ab6c461782d1621d4d6e49a8e863))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.190.0 to 1.195.0 ([5ad08d6](https://github.com/wmfs/tymly-cardscript-plugin/commit/5ad08d666929e8b5fab421dfbee419366a299560))
* **deps-dev:** bump mocha from 7.1.0 to 7.1.1 ([ff425e8](https://github.com/wmfs/tymly-cardscript-plugin/commit/ff425e85701bf318ae8e56495c3d659ef49cc1a7))
* **deps-dev:** bump nyc from 15.0.0 to 15.0.1 ([25827e7](https://github.com/wmfs/tymly-cardscript-plugin/commit/25827e751347bbde88befa1987c0f9da5cc16897))


### 📦 Code Refactoring

* s/stopped/completed/ in test titles, pull out a couple of helper fns ([a866da1](https://github.com/wmfs/tymly-cardscript-plugin/commit/a866da1c2d99a83c2ae340dddeb98e2572ec8d2a))


### 🚨 Tests

* archiveExecution test - archiving an archived execution is fine ([69961b2](https://github.com/wmfs/tymly-cardscript-plugin/commit/69961b2f2b7893e1f83d63d9a5f141aaac64ab09))
* Tests around the archive execution state machine and resource ([d0f9aaf](https://github.com/wmfs/tymly-cardscript-plugin/commit/d0f9aafec9aca889d78f836cb2b585a1cf4234ee))
* Tests for archive state machine ([bf9e644](https://github.com/wmfs/tymly-cardscript-plugin/commit/bf9e644c32dd824b8bb1eba40a805db92131ca79))


### ⚙️ Continuous Integrations

* **circle:** add context env var config to config.yml ([e9da851](https://github.com/wmfs/tymly-cardscript-plugin/commit/e9da85139d74e387541b967a3e938c73e7ac457d))


### 💎 Styles

* Lint fixes. ([19cfe89](https://github.com/wmfs/tymly-cardscript-plugin/commit/19cfe89a86e78c168ff69ecaa66cd13955777b4a))
* Small lint fix - shouldn't return result of an assignment from an arrow function ([7f6325d](https://github.com/wmfs/tymly-cardscript-plugin/commit/7f6325dd3730b167fb4faceed3a76d897ba6fdcc))

# [1.12.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.11.0...v1.12.0) (2020-03-18)


### 🛠 Builds

* **deps:** bump jsonfile from 6.0.0 to 6.0.1 ([3c502a0](https://github.com/wmfs/tymly-cardscript-plugin/commit/3c502a0ed02c07b86c203cb906d5155dc2f102db))
* **deps-dev:** bump [@semantic-release](https://github.com/semantic-release)/exec from 3.3.8 to 5.0.0 ([d7b5451](https://github.com/wmfs/tymly-cardscript-plugin/commit/d7b5451add295416d0563cac497338459ea5520b))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.17.0 to 1.18.0 ([37aada6](https://github.com/wmfs/tymly-cardscript-plugin/commit/37aada6b732f490ce3174658479768efeea6e039))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.120.0 to 1.123.0 ([dadf4c5](https://github.com/wmfs/tymly-cardscript-plugin/commit/dadf4c5a7a5f263f64e4fb017becb316a7103ab2))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.123.0 to 1.124.0 ([db230f3](https://github.com/wmfs/tymly-cardscript-plugin/commit/db230f301948b00f1b7f60e21d4c16e9f2f02556))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.124.0 to 1.125.0 ([503bd27](https://github.com/wmfs/tymly-cardscript-plugin/commit/503bd27477462f22c7648b54cb0cac941f61fbb6))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.125.0 to 1.126.0 ([2dc2a7a](https://github.com/wmfs/tymly-cardscript-plugin/commit/2dc2a7af9ddf8b2837c553c48740ea7bd37674b1))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.126.0 to 1.126.1 ([128791e](https://github.com/wmfs/tymly-cardscript-plugin/commit/128791eb59216c42d6629bf09010954992a3837c))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.126.1 to 1.126.2 ([fa06d15](https://github.com/wmfs/tymly-cardscript-plugin/commit/fa06d151821b1af4fc28204bc11c40486c86e6e0))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.171.0 to 1.172.0 ([88428be](https://github.com/wmfs/tymly-cardscript-plugin/commit/88428be9ab0dbdd7742b5d1a3abd1ffe804933c8))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.172.0 to 1.176.0 ([e29410e](https://github.com/wmfs/tymly-cardscript-plugin/commit/e29410e3c41c6605d7b3267d4de07f017a1270b5))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.6.0 to 2.7.0 ([4430c45](https://github.com/wmfs/tymly-cardscript-plugin/commit/4430c4592de554511edb31631988fada6c178f5b))
* **deps-dev:** bump conventional-changelog-metahub from 4.0.0 to 4.0.1 ([08c454a](https://github.com/wmfs/tymly-cardscript-plugin/commit/08c454a5d923afc6778ef84e657f2332687060f9))
* **deps-dev:** bump mocha from 7.0.1 to 7.1.0 ([c6049d1](https://github.com/wmfs/tymly-cardscript-plugin/commit/c6049d191be44ef98a1e435cd1340a4cb65f1b9a))
* **deps-dev:** bump standard from 14.3.1 to 14.3.2 ([ea020aa](https://github.com/wmfs/tymly-cardscript-plugin/commit/ea020aa31abecae042aed4caf3cc181beaa8a18a))
* **deps-dev:** bump standard from 14.3.2 to 14.3.3 ([821dcc5](https://github.com/wmfs/tymly-cardscript-plugin/commit/821dcc5ce9bad164a6fa85b3a2540035d9aa1c10))

# [1.11.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.10.1...v1.11.0) (2020-02-26)


### 🛠 Builds

* **deps:** bump jsonfile from 5.0.0 to 6.0.0 ([9e16c14](https://github.com/wmfs/tymly-cardscript-plugin/commit/9e16c144cab159778b48d05c4714f264efceca5c))
* **deps-dev:** bump [@semantic-release](https://github.com/semantic-release)/git from 7.0.18 to 9.0.0 ([b31483d](https://github.com/wmfs/tymly-cardscript-plugin/commit/b31483df6862cb3cf7dbd8327d08204e566a1fb2))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.119.0 to 1.120.0 ([11085d9](https://github.com/wmfs/tymly-cardscript-plugin/commit/11085d9bb95190d5a7fc2d2448ae1c8aff20f067))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.168.0 to 1.170.0 ([fa08845](https://github.com/wmfs/tymly-cardscript-plugin/commit/fa08845dfd7cd5b8297cd9d9a3b38e9e3b33ac0b))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.170.0 to 1.171.0 ([1265504](https://github.com/wmfs/tymly-cardscript-plugin/commit/12655043aaaa4e4f5a4f4f51abd4a2f8adb6f99d))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.4.0 to 2.6.0 ([84fcf8e](https://github.com/wmfs/tymly-cardscript-plugin/commit/84fcf8e4ac85f585de41a5bddb5542a6955d7a5d))
* **deps-dev:** bump codecov from 3.6.4 to 3.6.5 ([2176c57](https://github.com/wmfs/tymly-cardscript-plugin/commit/2176c57174030a34bda6d7db1f1f3db8d0d4675d))
* **deps-dev:** bump semantic-release from 15.14.0 to 17.0.4 ([7d13cd7](https://github.com/wmfs/tymly-cardscript-plugin/commit/7d13cd7840381ce3da06903f8f48ed18315ab865))

## [1.10.1](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.10.0...v1.10.1) (2020-02-11)


### 🐛 Bug Fixes

* remove delta index from state machines ([eda525c](https://github.com/wmfs/tymly-cardscript-plugin/commit/eda525cf0286fbe7ff0bd38e0a2c35b13eb45d88))


### 🛠 Builds

* **deps-dev:** bump [@semantic-release](https://github.com/semantic-release)/changelog from 3.0.6 to 5.0.0 ([002543d](https://github.com/wmfs/tymly-cardscript-plugin/commit/002543d6cbf1cac3b6ea7cd2341042a194896fa9))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.14.0 to 1.15.0 ([75c3c34](https://github.com/wmfs/tymly-cardscript-plugin/commit/75c3c34fe78929f959950ecf86394f3ea5fd02c4))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.15.0 to 1.16.0 ([ad40ae3](https://github.com/wmfs/tymly-cardscript-plugin/commit/ad40ae3db789385ea409d30e5f6585240a52803e))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.16.0 to 1.17.0 ([2b1f998](https://github.com/wmfs/tymly-cardscript-plugin/commit/2b1f99869eb453f2c3c1ac90a01407b0fa68f1f8))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.112.1 to 1.113.0 ([f0788b0](https://github.com/wmfs/tymly-cardscript-plugin/commit/f0788b0b8419ec653719bf8d19ba4b7fee6d6a2e))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.113.0 to 1.114.0 ([d6488d1](https://github.com/wmfs/tymly-cardscript-plugin/commit/d6488d1761ae45ad39c94f4af1874ebb5bf5d0ff))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.114.0 to 1.115.0 ([5b2af2e](https://github.com/wmfs/tymly-cardscript-plugin/commit/5b2af2eccfc3b9b2b5af25b92dfbf92701620054))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.115.0 to 1.116.0 ([0880e8b](https://github.com/wmfs/tymly-cardscript-plugin/commit/0880e8bae6bd1137ca166a71df022950835576ca))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.116.0 to 1.117.0 ([f0d25a4](https://github.com/wmfs/tymly-cardscript-plugin/commit/f0d25a44b9901f4240709d4426ee819bf35afc62))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.117.0 to 1.118.0 ([4182146](https://github.com/wmfs/tymly-cardscript-plugin/commit/4182146adbc6e84544f88bb00dcfa5858fb70b40))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.118.0 to 1.119.0 ([828827d](https://github.com/wmfs/tymly-cardscript-plugin/commit/828827de3a80acab8cb7dd41c229b26bf9094840))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.151.1 to 1.153.0 ([04c4251](https://github.com/wmfs/tymly-cardscript-plugin/commit/04c4251913478d60d2805c8cd04568bb761a6110))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.153.0 to 1.154.0 ([5aaf0a2](https://github.com/wmfs/tymly-cardscript-plugin/commit/5aaf0a27ef08d97497713c47fdc5158975775bff))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.154.0 to 1.155.0 ([cdbcb2c](https://github.com/wmfs/tymly-cardscript-plugin/commit/cdbcb2cb9f50e9e0c2dc4c4779c0702a1819db4f))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.155.0 to 1.157.0 ([d5648aa](https://github.com/wmfs/tymly-cardscript-plugin/commit/d5648aa2d51227199e52dd8bd7f51e0416762d75))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.157.0 to 1.158.0 ([77cc39c](https://github.com/wmfs/tymly-cardscript-plugin/commit/77cc39c9334ea18f1a0f3261b3108ba844c2b2e0))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.158.0 to 1.159.0 ([f48b9dc](https://github.com/wmfs/tymly-cardscript-plugin/commit/f48b9dca202c04671fa3a280a429419fa6ad3ebc))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.159.0 to 1.160.0 ([bce9691](https://github.com/wmfs/tymly-cardscript-plugin/commit/bce96919b1c756d49bb538ff0fbbca53f9986237))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.160.0 to 1.161.0 ([f1083e6](https://github.com/wmfs/tymly-cardscript-plugin/commit/f1083e6090333770e96a8d8edfb6c7e4c7d0c0b5))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.161.0 to 1.162.0 ([9734449](https://github.com/wmfs/tymly-cardscript-plugin/commit/9734449036a1560bbc2ea740443cd799fd6fb11b))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.162.0 to 1.165.0 ([85fb3bb](https://github.com/wmfs/tymly-cardscript-plugin/commit/85fb3bbe8873b175bd6ae42149f868800eea80dc))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.165.0 to 1.167.0 ([d9c7e04](https://github.com/wmfs/tymly-cardscript-plugin/commit/d9c7e04d3071fef60d56425bb8ec4ba46a6503e0))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.167.0 to 1.168.0 ([f734698](https://github.com/wmfs/tymly-cardscript-plugin/commit/f734698c87eb14f564fc3f675c106593cc15f080))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.2.1 to 2.3.0 ([faa5edb](https://github.com/wmfs/tymly-cardscript-plugin/commit/faa5edbbb4dc9f03beb3e48a0986f8fb1b4a2723))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.3.0 to 2.4.0 ([6f00548](https://github.com/wmfs/tymly-cardscript-plugin/commit/6f005487ca283f0e444d62d75e82b61d42cf7b79))
* **deps-dev:** bump codecov from 3.6.1 to 3.6.2 ([47716b0](https://github.com/wmfs/tymly-cardscript-plugin/commit/47716b04bd847b62232e8c6d857516c00094e675))
* **deps-dev:** bump codecov from 3.6.2 to 3.6.3 ([afe841e](https://github.com/wmfs/tymly-cardscript-plugin/commit/afe841e6119e1c97af650bac596576ce1d92e4d0))
* **deps-dev:** bump codecov from 3.6.3 to 3.6.4 ([353c1f8](https://github.com/wmfs/tymly-cardscript-plugin/commit/353c1f8fa6c91beae485b2e922e38e5cb33e9aa3))
* **deps-dev:** bump cz-conventional-changelog from 3.0.2 to 3.1.0 ([15d7679](https://github.com/wmfs/tymly-cardscript-plugin/commit/15d7679bc907f82891e5d2e22ea6814f2af41afb))
* **deps-dev:** bump mocha from 7.0.0 to 7.0.1 ([2ff5af5](https://github.com/wmfs/tymly-cardscript-plugin/commit/2ff5af521f0e82180bfafcc879f2264a6ab2bc48))
* **deps-dev:** update standard requirement from 12.0.1 to 14.3.1 ([6cebb6c](https://github.com/wmfs/tymly-cardscript-plugin/commit/6cebb6c9e80331ef3a86966ff7c0f65be65010c4))


### 🚨 Tests

* skip test for now ([855cd1b](https://github.com/wmfs/tymly-cardscript-plugin/commit/855cd1bd3ac5223f4e99e160721d21b3cc98daff))
* update expects to not look for DeltaReindex state ([2f85c97](https://github.com/wmfs/tymly-cardscript-plugin/commit/2f85c979655d88ed211ab341a024a25dde9d6a74))


### 💎 Styles

* standard --fix ([b323a34](https://github.com/wmfs/tymly-cardscript-plugin/commit/b323a34cf8caa67b6fc05b50e110ef56f101c600))

# [1.10.0](https://github.com/wmfs/tymly-cardscript-plugin/compare/v1.9.1...v1.10.0) (2020-01-23)


### 🛠 Builds

* **deps:** bump [@wmfs](https://github.com/wmfs)/form-maker from 1.3.0 to 1.4.0 ([e0dad79](https://github.com/wmfs/tymly-cardscript-plugin/commit/e0dad7923529c492fcee265e1b4df62274c1e9f0))
* **deps-dev:** add [@semantic-release](https://github.com/semantic-release)/exec ([511cb3a](https://github.com/wmfs/tymly-cardscript-plugin/commit/511cb3aa9665c04b4aa0265003da69d83b0726c7))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/hl-pg-client from 1.13.0 to 1.14.0 ([e16692e](https://github.com/wmfs/tymly-cardscript-plugin/commit/e16692e0a9096f23d1585de2f90717de2102566c))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.103.3 to 1.104.0 ([d1ea7d8](https://github.com/wmfs/tymly-cardscript-plugin/commit/d1ea7d80b6c80366de14f6c076fead4f70208f72))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.104.0 to 1.105.0 ([ecb54a0](https://github.com/wmfs/tymly-cardscript-plugin/commit/ecb54a07492587d4044b86aff54edde733c1736e))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.105.0 to 1.106.0 ([e83c8a6](https://github.com/wmfs/tymly-cardscript-plugin/commit/e83c8a68b31a2b4d4c67e48553e440c1a588b323))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.106.0 to 1.107.0 ([a2e035d](https://github.com/wmfs/tymly-cardscript-plugin/commit/a2e035dd30da85417ecc04dd2751b71d49245398))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.107.0 to 1.109.0 ([398e061](https://github.com/wmfs/tymly-cardscript-plugin/commit/398e0610ffa6d29f917b369b120b290b4cab7eb1))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.109.0 to 1.110.0 ([048c314](https://github.com/wmfs/tymly-cardscript-plugin/commit/048c3145c813b2c67d946877e71cccda3935d196))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.110.0 to 1.112.0 ([f306c06](https://github.com/wmfs/tymly-cardscript-plugin/commit/f306c06ab740fcef9a3c2df7b2ba160e4941ace4))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly from 1.112.0 to 1.112.1 ([4036bb4](https://github.com/wmfs/tymly-cardscript-plugin/commit/4036bb42c961579b99d9377b70f82b32a4c5129c))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.137.0 to 1.138.0 ([e2a055f](https://github.com/wmfs/tymly-cardscript-plugin/commit/e2a055fd70ff8d64269de122a369d5ffeef8fb37))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.138.0 to 1.140.0 ([541b878](https://github.com/wmfs/tymly-cardscript-plugin/commit/541b878e2df5859048056a976a4191fb6e858475))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.140.0 to 1.141.0 ([9c7f864](https://github.com/wmfs/tymly-cardscript-plugin/commit/9c7f864cfc6ec612f36bd3c039443525413f2910))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.141.0 to 1.142.0 ([e65afac](https://github.com/wmfs/tymly-cardscript-plugin/commit/e65afacdfe2fd2f21f7fef0d6aa39d93e1b11c20))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.142.0 to 1.143.0 ([f338ec4](https://github.com/wmfs/tymly-cardscript-plugin/commit/f338ec4672889687b3e86fb992d8f3fe6d7f6297))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.143.0 to 1.144.0 ([20527c2](https://github.com/wmfs/tymly-cardscript-plugin/commit/20527c216e7194fddb0b529844229ff99bd3bc59))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.144.0 to 1.146.0 ([4009eb6](https://github.com/wmfs/tymly-cardscript-plugin/commit/4009eb6e55ac2cd4e254b2a329335110d0540592))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.146.0 to 1.147.0 ([66ec33e](https://github.com/wmfs/tymly-cardscript-plugin/commit/66ec33e5dfcc435928d373ce51f9562b2cd7f31a))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.146.0 to 1.148.0 ([2406e4b](https://github.com/wmfs/tymly-cardscript-plugin/commit/2406e4b0d016768f21cb7caa99e001c56ed6e067))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.148.0 to 1.151.0 ([9b66604](https://github.com/wmfs/tymly-cardscript-plugin/commit/9b66604ffbc1c5e8d9f0947623dcc7e6df9382ee))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-pg-plugin from 1.151.0 to 1.151.1 ([272fef7](https://github.com/wmfs/tymly-cardscript-plugin/commit/272fef744bb65bc15a96a857ea34f00dba169ec7))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-rbac-plugin from 1.16.0 to 1.17.0 ([65e766d](https://github.com/wmfs/tymly-cardscript-plugin/commit/65e766d76fb39c86e83ca37b11da68d4b43f4dc5))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.1.1 to 2.2.0 ([7022681](https://github.com/wmfs/tymly-cardscript-plugin/commit/702268173997164a369e67f35608192f1080e05f))
* **deps-dev:** bump [@wmfs](https://github.com/wmfs)/tymly-solr-plugin from 2.2.0 to 2.2.1 ([7c33c5d](https://github.com/wmfs/tymly-cardscript-plugin/commit/7c33c5d48840ed4b787540cb3c7f16b0234cb469))
* **deps-dev:** bump conventional-changelog-metahub from 3.0.0 to 4.0.0 ([7b020ce](https://github.com/wmfs/tymly-cardscript-plugin/commit/7b020ce790a54825f91a2f689528ef6ebd50493f))
* **deps-dev:** bump mocha from 6.2.2 to 7.0.0 ([d90b7ca](https://github.com/wmfs/tymly-cardscript-plugin/commit/d90b7ca82bf361c392e2178121a1ac43be58a6e2))
* **deps-dev:** bump packages ([9d239e4](https://github.com/wmfs/tymly-cardscript-plugin/commit/9d239e457621c833acafd167c37269c1b0788c02))


### ⚙️ Continuous Integrations

* **circle:** update config ([bc54e01](https://github.com/wmfs/tymly-cardscript-plugin/commit/bc54e0164abdc4895243a29d84cf859ea0bda5ba))


### ♻️ Chores

* add plugin.json ([b652889](https://github.com/wmfs/tymly-cardscript-plugin/commit/b652889ae50d012971c0279fed919f36d9f1d815))
* add version_plugin script ([afc048c](https://github.com/wmfs/tymly-cardscript-plugin/commit/afc048c77b14451ed7579e3f8f6eb02ce0f2a446))
* update .releaserc.json ([1120935](https://github.com/wmfs/tymly-cardscript-plugin/commit/11209359606a66a802bbcd075d427237f4f4be63))

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
