# Family Hubs Open Referral UK tester

A tool to fetch and validate the quality of data from Open Referral UK APIs.

## Purpose

The Family Hubs DfE delivery team use this tool to pull and quality check the data available on current (as of Dec 2024) Open Referral UK APIs.

## Data source

The list of APIs was gathered from here: https://openreferraluk.org/dashboard

## Usage

1. Clone the repo
2. Run `npm install` to install node dependencies
3. Run `npm run fetch` to fetch up to date data
4. Run `npm run eval` to run the evaluation tool over the pulled data

Results will be shown in the console:

```
...
│ 817     │ 'f92ddae3-2007-8cf8-c9eb-ec2aad962f2a' │ false      │ true         │ true                │ true        │ true                 │ true            │
│ 818     │ 'dbb17998-b11a-45e7-ac1f-2bae60e40e0a' │ true       │ true         │ true                │ true        │ true                 │ false           │
└─────────┴────────────────────────────────────────┴────────────┴──────────────┴─────────────────────┴─────────────┴──────────────────────┴─────────────────┘
# of services with a valid ID: 399/819 (49%)
# of services with a valid name: 818/819 (100%)
# of services with a valid description: 819/819 (100%)
# of services with a valid URL: 691/819 (84%)
# of services with a valid organisation: 812/819 (99%)
# of services with a valid contact: 598/819 (73%)
```