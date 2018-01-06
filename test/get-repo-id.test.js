import test from 'ava';
import getRepoId from '../lib/get-repo-id';

test('Parse repo id with https URL', t => {
  t.is(getRepoId('https://gitlbab.com', 'https://gitlab.com/owner/repo.git'), 'owner/repo');
  t.is(getRepoId('https://gitlbab.com', 'https://gitlab.com/owner/repo'), 'owner/repo');
});

test('Parse repo id with git URL', t => {
  t.is(getRepoId('https://gitlab.com', 'git+ssh://git@gitlab.com/owner/repo.git'), 'owner/repo');
  t.is(getRepoId('https://gitlab.com', 'git+ssh://git@gitlab.com/owner/repo'), 'owner/repo');
});

test('Parse repo id with context in repo URL', t => {
  t.is(getRepoId('https://gitlbab.com/context', 'https://gitlab.com/context/owner/repo.git'), 'owner/repo');
  t.is(getRepoId('https://gitlab.com/context', 'git+ssh://git@gitlab.com/context/owner/repo.git'), 'owner/repo');
});

test('Parse repo id with context not in repo URL', t => {
  t.is(getRepoId('https://gitlbab.com/context', 'https://gitlab.com/owner/repo.git'), 'owner/repo');
  t.is(getRepoId('https://gitlab.com/context', 'git+ssh://git@gitlab.com/owner/repo.git'), 'owner/repo');
});

test('Parse repo id with organization and subgroup', t => {
  t.is(
    getRepoId('https://gitlbab.com/context', 'https://gitlab.com/orga/subgroup/owner/repo.git'),
    'orga/subgroup/owner/repo'
  );
  t.is(
    getRepoId('https://gitlab.com/context', 'git+ssh://git@gitlab.com/orga/subgroup/owner/repo.git'),
    'orga/subgroup/owner/repo'
  );
});
