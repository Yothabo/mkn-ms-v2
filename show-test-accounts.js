// Simple script to show test accounts
const testAccounts = [
  {
    member: {
      name: "Sipho",
      surname: "Ndlovu",
      mainBranch: "Johannesburg",
      status: "Active Member"
    },
    credentials: {
      type: "card",
      identifier: "1001"
    }
  },
  {
    member: {
      name: "Thandeka",
      surname: "Khumalo",
      mainBranch: "Pretoria",
      status: "New Member"
    },
    credentials: {
      type: "receipt",
      identifier: "RCPT20241001"
    }
  },
  {
    member: {
      name: "Bongani",
      surname: "Moyo",
      mainBranch: "Bulawayo",
      status: "Pre-RA Member"
    },
    credentials: {
      type: "card",
      identifier: "1003"
    }
  },
  {
    member: {
      name: "Nompumelelo",
      surname: "Dube",
      mainBranch: "Harare",
      status: "RA Member"
    },
    credentials: {
      type: "card",
      identifier: "1004"
    }
  },
  {
    member: {
      name: "Jabulani",
      surname: "Mpofu",
      mainBranch: "Gaborone",
      status: "Inactive Member"
    },
    credentials: {
      type: "card",
      identifier: "1005"
    }
  },
  {
    member: {
      name: "Nkosinathi",
      surname: "Sibanda",
      mainBranch: "Johannesburg",
      status: "Deceased Member"
    },
    credentials: {
      type: "card",
      identifier: "1006"
    }
  },
  {
    member: {
      name: "Tech",
      surname: "Support",
      mainBranch: "System",
      status: "Tech User"
    },
    credentials: {
      type: "card",
      identifier: "8888"
    }
  },
  {
    member: {
      name: "Admin",
      surname: "User",
      mainBranch: "System",
      status: "Admin"
    },
    credentials: {
      type: "card",
      identifier: "1111"
    }
  },
  {
    member: {
      name: "Super",
      surname: "Admin",
      mainBranch: "System",
      status: "Super Admin"
    },
    credentials: {
      type: "card",
      identifier: "9999"
    }
  }
];

console.log('=== TEST ACCOUNTS FOR AUTHENTICATION ===\n');

testAccounts.forEach((account, index) => {
  const member = account.member;
  console.log(`Account ${index + 1}:`);
  console.log(`  Name: ${member.name} ${member.surname}`);
  console.log(`  ${account.credentials.type.toUpperCase()}: ${account.credentials.identifier}`);
  console.log(`  Branch: ${member.mainBranch}`);
  console.log(`  Status: ${member.status}`);
  console.log('  ---');
});

console.log('\n=== HOW TO USE ===');
console.log('For login/register, use any of the above card/receipt numbers.');
console.log('Password can be anything (not validated in demo).');
console.log('For verification, use the exact name and identifier shown.');
