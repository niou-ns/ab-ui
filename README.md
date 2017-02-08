# README #

This README would normally document whatever steps are necessary to get your application up and running.


### How do I get set up? ###

* clone repo
* npm install

### Usage guidelines ###
* grunt less:compileCore (just css compile)
* grunt dist (to create package)
* grunt deploy --dest="../sfdc/AB/resource-bundles/AB_ui.resource/" (to copy package to selected dir as static resource)
* grunt deployCompressed --dest="../sfdc/AB/resource-bundles/" (to copy zipped package)

### Contribution guidelines ###

* include new files in ab.less file
