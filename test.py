#!/usr/bin/env python

import sys
import pexpect

PASSED = 'PASSED:'
FAILED = 'FAILED:'

timeout = 1000

# end_stmt = u'[-]*RESULTS[-]*'
end_stmt = '---------------------RESULTS----------------------'
cmd = 'meteor npm run coverage-app-unit'
proc_fork = pexpect.spawnu(cmd)
# proc_fork.logfile = sys.stdout
proc_fork.expect(u'')
# index = proc_fork.expect([end_stmt, pexpect.EOF, pexpect.TIMEOUT],
# timeout=None)
lines = proc_fork.read_nonblocking(timeout=timeout, size=1000)
while end_stmt not in lines:
    lines = lines.rstrip()
    if len(lines) > 0:
        print(lines)
    try:
        lines = proc_fork.read_nonblocking(timeout=timeout, size=1000)
    except Exception:
        pass


while PASSED not in lines:
    if len(lines) > 0:
        print(lines)
    try:
        lines = proc_fork.read_nonblocking(timeout=timeout, size=1000)
    except Exception:
        pass

idx = lines.find(PASSED)
num_passed = int(lines[idx:idx + len(PASSED) + 2][-1])

while FAILED not in lines:
    if len(lines) > 0:
        print(lines)
    try:
        lines = proc_fork.read_nonblocking(timeout=timeout, size=1000)
    except Exception:
        pass

print(lines)
idx = lines.find(FAILED)
num_failed = int(lines[idx:idx + len(FAILED) + 2][-1])


proc_fork.close()

if num_failed > 0:
    sys.exit(num_failed)
