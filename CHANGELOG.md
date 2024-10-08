# Tailor Changelog

# 8.0.0
* [#28](https://github.com/namecheap/error-extender/pull/1) support nodejs v20
  * update dependencies
  * align CI
  * fix lint errors
  * fix incompatibilities
  * (**breaking change**) Drop nodejs version < 16

# 7.0.0
* [#27](https://github.com/StyleT/tailorx/pull/27) CI for Node.js 14
* [#26](https://github.com/StyleT/tailorx/pull/27) (**breaking change**) simplified error handling of `fetchContext(request)` function

  This ensures that it's impossible to accidentally render page with incorrect context. To preserve old behaviour - wrap your
  `fetchContext` function with custom error handler which returns `{}`.
  Done by replacing `context:error(request, error)` event with `error(request, error, response)`.

## 6.1.1
* [#25](https://github.com/StyleT/tailorx/pull/25) Fixed support for custom attributes, see issue at upstream https://github.com/zalando/tailor/issues/287

## 6.1.0
* Added `ignore-invalid-ssl` fragment atrribute [#24](https://github.com/StyleT/tailorx/pull/24)

## 6.0.0
* Added `processFragmentResponse(response, context): response` option:
    * See PR [#23](https://github.com/StyleT/tailorx/pull/23)
    * (**breaking change**) Modified `requestFragment(filterHeaders, processFragmentResponse)(url, attributes, request)` option

## 5.7.0
* Treat non 2xx http status codes from non-primary fragments as error by default
[#22](https://github.com/StyleT/tailorx/pull/22)

## 5.6.0
* `shouldSetPrimaryFragmentAssetsToPreload` option added [#20](https://github.com/StyleT/tailorx/pull/20)

## 5.5.0
* Now it's possible to provide links for preload on per-request basis
[#19](https://github.com/StyleT/tailorx/pull/19)

## 5.4.0
* Add ignoring special content during parsing to speed up performance
[#18](https://github.com/StyleT/tailorx/pull/18)

## 5.3.0
* Memoization of the CPU expensive template parsing added [#17](https://github.com/StyleT/tailorx/pull/17)

## 5.2.0
* keep-alive support

## 5.1.0
* "forward-querystring" fragment attribute added [#16](https://github.com/StyleT/tailorx/pull/16)

## 5.0.0
* See PR [#15](https://github.com/StyleT/tailorx/pull/15)
    * (**breaking change**) removal of the frontend logic & Pipe.js
    * "fragmentHooks" option added to TailorX
    * More advanced `Link` header parsing logic
    * (**breaking change**) `amdLoaderUrl()` option was replaced with `getAssetsToPreload()`

## 4.1.0
* added injection of the "title" & "meta" tags onto page header [#11](https://github.com/StyleT/tailorx/pull/11)
* better error handing capabilities [#12](https://github.com/StyleT/tailorx/pull/12)
* SeoBotsGuardStream added [#13](https://github.com/StyleT/tailorx/pull/13)
* "return-headers" fragment attribute added [#14](https://github.com/StyleT/tailorx/pull/14)

## 4.0.0
* removal of the "fallback-src" attribute support for fragments

### 3.11.0
* adding "data-fragment-id" attr to the CSS links for fragments with "id" attribute specified
* support of "invalid" Link headers added

### 3.10.0
* Re-branding to TailorX

### 3.9.2
* add timeout field to fragment opentracing span([#270](https://github.com/zalando/tailor/pull/270))

### 3.9.1
* handle streams in object mode while buffering([#258](https://github.com/zalando/tailor/pull/258))

### 3.9.0
* (perf) consume streams in parallel and flush them in series([#256](https://github.com/zalando/tailor/pull/256))

### 3.8.0
* change in parent span operation name([#238](https://github.com/zalando/tailor/pull/238))
* support multiple subscribers on tailor onDone hook([#243](https://github.com/zalando/tailor/pull/243))
* (perf) Minor optimization on attributes extraction([#247](https://github.com/zalando/tailor/pull/247))
* (perf) Improve link header extraction logic for fragments([#248](https://github.com/zalando/tailor/pull/248))

### 3.7.1
* handle parsing & primary error properly([#235](https://github.com/zalando/tailor/pull/235))
* Opentracing - Pass correct span contexts and add tests([#236](https://github.com/zalando/tailor/pull/236))

### 3.7.0
* Added Opentracing Instrumentation([#232](https://github.com/zalando/tailor/pull/232))
* Added Typescript definitions([#226](https://github.com/zalando/tailor/pull/226))
* Support asset preloading for aws custom headers([#229](https://github.com/zalando/tailor/pull/229))

### 3.6.0
* Pass all custom fragment attributes to filterRequestHeaders([#209](https://github.com/zalando/tailor/pull/209))
* Custom API for adding TTFMP from fragments([#214](https://github.com/zalando/tailor/pull/214))

### 3.5.1

* (fix) - Pipe the AMD loader script from extended options ([#205](https://github.com/zalando/tailor/pull/205))

### 3.5.0
* Parse comment tags without error in child templates ([#195](https://github.com/zalando/tailor/pull/195))
* Preload the module loader script with HTTP link headers ([#203](https://github.com/zalando/tailor/pull/203))

### 3.4.0
* Fix for handling comment nodes in child tempaltes ([#191](https://github.com/zalando/tailor/pull/191))
* Two headers (`x-request-uri` & `x-request-host`) are added to the whitelist along with documentation on how to use them ([#192](https://github.com/zalando/tailor/pull/192))

### 3.3.0
* Add API support for custom performance entries([#187](https://github.com/zalando/tailor/pull/187))

### 3.2.1
* End asyncStream later in the process (before piping) ([#185](https://github.com/zalando/tailor/pull/185))

### 3.2.0
* Extract tag handling logic from request handler([#173](https://github.com/zalando/tailor/pull/173))
* Prettier Integration([#181](https://github.com/zalando/tailor/pull/181))
* Proper error propagation on template error([#179](https://github.com/zalando/tailor/pull/179))
* Code coverage improvements([#182](https://github.com/zalando/tailor/pull/182), [#183](https://github.com/zalando/tailor/pull/183))

### 3.1.1

* Allow file to be used a template instead of directory([#171](https://github.com/zalando/tailor/pull/171))
* Use `promisify` module to simpify the code([#174](https://github.com/zalando/tailor/pull/174))

### 3.0.1
* Custom performance hooks should be called for all fragments([#168](https://github.com/zalando/tailor/pull/168))

### 3.0.0
* Support for multiple link headers from fragments ([#140](https://github.com/zalando/tailor/pull/140))
* Update Buffer to Node 8 Syntax ([#154](https://github.com/zalando/tailor/pull/154))
* Update fragment performance hooks to support multiple link headers ([#159](https://github.com/zalando/tailor/pull/159))
* Support to forward headers from primary fragment via filterResponseHeaders ([#148](https://github.com/zalando/tailor/pull/148))

##### Contributors
- Aditya Pratap Singh ([addityasingh](https://github.com/addityasingh))
- Ramiro Rikkert ([rikkert](https://github.com/rikkert))
- Iilei ([iilei](https://github.com/iilei))

### 2.3.0
* write response headers once before flushing([#145](https://github.com/zalando/tailor/pull/145))

### 2.2.0
* Fix issue with preloading primary fragment assets([#141](https://github.com/zalando/tailor/pull/141))

### 2.1.1
* Opt out of server push for preloaded JS and CSS([#139](https://github.com/zalando/tailor/pull/139))

### 2.1.0
* Fix uglify-js options to preserve implicit return in IIFE ([#133](https://github.com/zalando/tailor/pull/133))
* Lock down the dependencies version to avoid issues with external libs ([#135](https://github.com/zalando/tailor/pull/135))

### 2.0.2
* Fix preloading headers for crossorigin scripts([#130](https://github.com/zalando/tailor/pull/130))

### 2.0.1
* [Perf] Preload the Primary fragment's assets ([#127](https://github.com/zalando/tailor/issues/127))

### 2.0.0
* Allow Lazy fragment initialization through promise ([#94](https://github.com/zalando/tailor/issues/94))
* Hooks for measuring performance of fragments initialization on frontend ([#95](https://github.com/zalando/tailor/issues/95))
* Migrate codebase to ES6 ([#109](https://github.com/zalando/tailor/issues/109))
* Html compatible for script tags ([#86](https://github.com/zalando/tailor/issues/86))
* Configurable options for filtering headers ([#91](https://github.com/zalando/tailor/issues/91))

##### Breaking changes
* Dropped node 4.x.x support
* Modified logic for `pipeInstanceName` and `requestFragment`. Please check the [options](https://github.com/zalando/tailor#options)

##### Contributors
- Aditya Pratap Singh ([addityasingh](https://github.com/addityasingh))
- Simeon Cheeseman ([SimeonC](https://github.com/SimeonC))
- Boopathi Rajaa ([boopathi](https://github.com/boopathi))
- Dan Peddle ([dazld](https://github.com/dazld))
- Vignesh Shanmugam ([vigneshshanmugam](https://github.com/vigneshshanmugam))

### 1.1.0
* Support fragment level compression (gzip/deflate)

### 1.0.7
* Inline AMD loader if specified as file URL (Performance)

### 1.0.6
* Asynchronous file read in built-in fetch
* Respond 404 in case of not found template

### 1.0.5
* Add support for fallback slots

### 1.0.4
* Fragment initialization metrics

### 1.0.3
* Update loadCSS to fix FF 38 crash on Async Fragments.

### 1.0.2
* Fix issue related to unnamed slot behaviour

### 1.0.1
* Introduced unnamed default slot

### 1.0.0
* Introduced HTML compatible parser
* Base templates using slots
* Flattens nested templates
