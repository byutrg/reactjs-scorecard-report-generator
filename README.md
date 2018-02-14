This is a ReactJS app which is intended to be plugged in to the [MQM Scorecard](https://github.com/multidimensionalquality/qt21-scorecard). It merges the results of quality assessment from the Scorecard with the original translation and a revision of the original to create a report. It can be used as a standalone web-app however by uploading a JSON export from the Scorecard.

# Building

Build the project with command `yarn build`.


# Deploying

This app can be deployed as a standalone web-app, plugged into the MQM scorecard, or even (_experimentally_) as a Cordova app.  When used outside of the Scorecard, bi-text file uploads and a JSON project export from the Scorecard are necessary.  Inside of the Scorecard, these uploads are not needed (except for the optional revised bi-text).

**Note: the Scorecard comes with the latest master build of this app included, so building again and installing into the Scorecard is only necessary if you make your own changes to this app.**

## Deploy as Web-App

Simply place the contents of the build folder into the desired web directory. The index.html file will load the JS and CSS components.

## Deploy in the Scorecard

Replace the contents of the [ReportGenerator](https://github.com/multidimensionalquality/qt21-scorecard/tree/master/src/DFKI/ScorecardBundle/Resources/public/react_apps/ReportGenerator) folder of your MQM Scorecard instance with the contents of the build folder.

On your Symfony instance run `php app/console assets:install` to propagate the new changes.

## Deploy as a Cordova app

If you have [Cordova](https://cordova.apache.org/) you can copy the contents of the build folder into the 'www' directory of your Cordova app and then do `cordova build [your platform]`. Tweaks may be necessary to get the report download feature working, as FileSaver.js doesn't work with Cordova (at least in the Windows platform build).
