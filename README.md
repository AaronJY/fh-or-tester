# Family Hubs Open Referral UK tester

A tool to fetch and validate the quality of data from Open Referral UK APIs.

## Purpose

The Family Hubs DfE delivery team use this tool to pull and quality check the data available on current (as of Dec 2024) Open Referral UK APIs.

## Data source

The list of APIs was gathered from here: https://openreferraluk.org/dashboard

## Usage

1. Clone the repo
2. Run `npm install` to install node dependencies
3. Run `node bin/fetch.js <url>` to fetch and save a JSON file containing an array of services data.
4. Run `node bin/eval.js <path>` to run the evaluation tool over a JSON file generated from step 3.

Results will be shown in the console:

```sh
...
│ 817     │ 'f92ddae3-2007-8cf8-c9eb-ec2aad962f2a' │ false      │ true         │ true                │ true        │ true                 │ true            │
│ 818     │ 'dbb17998-b11a-45e7-ac1f-2bae60e40e0a' │ true       │ true         │ true                │ true        │ true                 │ false           │
└─────────┴────────────────────────────────────────┴────────────┴──────────────┴─────────────────────┴─────────────┴──────────────────────┴─────────────────┘
--------------------
RESULTS
--------------------
# of services with a valid ID: 0/1157 (0%)
# of services with a valid status: 1152/1157 (100%)
# of services with a valid name: 1157/1157 (100%)
# of services with a valid description: 1135/1157 (98%)
# of services with a valid URL: 979/1157 (85%)
# of services with a valid organisation: 1149/1157 (99%)
# of services with a valid contact: 0/1157 (0%)
--------------------
# of usable services: 0/1157 (0%)
--------------------
```

**Note:** use the `--help` CLI flag to see more options for each command.

### Example usage

To fetch and evaluate the quality of data from Southampton's OR UK API (https://directory.southampton.gov.uk/api):

```sh
$ node bin/fetch.js https://directory.southampton.gov.uk/api/services
$ node bin/eval.js ./data/directorysouthamptongovuk.json
```

### Fetching all current OR UK-compliant local authority data

The following snippet will fetch data from all current (as of Dec 2024) OR UK-compliant local authorities with APIs on the [OR UK dashboard](https://openreferraluk.org/dashboard):

```sh
node bin/fetch.js https://bristol.openplace.directory/o/ServiceDirectoryService/v2/services
node bin/fetch.js https://northlincs.openplace.directory/o/ServiceDirectoryService/v2/services
node bin/fetch.js https://directory.southampton.gov.uk/api/services
node bin/fetch.js https://api.familyinfo.buckinghamshire.gov.uk/api/v1/services
node bin/fetch.js https://penninelancs.openplace.directory/o/ServiceDirectoryService/v2/services
```

