# Welcome to Sort contributing guide <!-- omit in toc -->

Thank you for investing your time in contributing to our project! :sparkles:

Read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community
approachable and respectable.

In this guide you will get an overview of the contribution workflow from opening
an issue, creating a PR, reviewing, and merging the PR.

Use the table of contents icon <img src="/contributing/img/toc.png" width="25"
height="25" /> on the top left corner of this document to get to a specific
section of this guide quickly.

## New contributor guide

To get an overview of the project, read the [README](README.md). Here are some
resources to help you get started with open source contributions:

- [Collaborating with pull
requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

### Issues

#### Create a new issue

If you spot a problem, [search if an issue already
exists](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments).
If a related issue doesn't exist, please open a new one.

##### Security

If you believe you have found a security vulnerability, we encourage you to
responsibly disclose this and _not_ open a public issue. We will investigate all
legitimate reports. Email security@sort.xyz to disclose any security
vulnerabilities.

#### Solve an issue

Scan through our existing issues to find one that interests you. As a general
rule, we don’t assign issues to anyone. If you find an issue to work on, you are
welcome to open a PR with a fix.

### Make Changes

1. Fork the repository.  - Using GitHub Desktop: - [Getting started with GitHub
Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop)
will guide you through setting up Desktop.  - Once Desktop is set up, you can
use it to [fork the
repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!

- Using the command line: - [Fork the
repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository)
so that you can make your changes without affecting the original project until
you're ready to merge them.

2. Install or update to **Node.js**, at the version specified in the `.nvm`
file. If you are using [nvm](https://github.com/nvm-sh/nvm), it can help make
this step easier.

3. Create a working branch and start with your changes!

#### Test your change

Test your changes before committing them.

##### Run a local build

```bash
npm run build
```

##### Link the package

```bash
# do this in this repo
npm run link
```

##### Link the package in your project

```bash
# do this in your project
npm run link @sort/react-components
```

#### Prepare for release

If everything works as expected, go ahead and make the commit.

#### How to write commits

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), if you're not familiar with it, please take a look as it will determine the type of release that is created.

### Pull Request

When you're finished with the changes, create a pull request, also known as a
PR.  - Please [link the PR to an
issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)
if you are solving one.  - Enable the checkbox to [allow maintainer
edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork)
so the branch can be updated for a merge.  Once you submit your PR, a team
member will review your proposal. We may ask questions or request additional
information.  - We may ask for changes to be made before a PR can be merged,
either using [suggested
changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request)
or pull request comments. You can apply suggested changes directly through the
UI. You can make any other changes in your fork, then commit them to your
branch.  - As you update your PR and apply changes, mark each conversation as
[resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git
tutorial](https://github.com/skills/resolve-merge-conflicts) to help you resolve
merge conflicts and other issues.

### Your PR is merged!

Congratulations :tada::tada: You are now part of the Sort development community. The
Sort team thanks you :sparkles:.
