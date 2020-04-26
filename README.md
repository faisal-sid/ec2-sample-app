# ec2-sample-app

The aim of this Project is to automate the creation and provision of a 3 tier application with the following specs:
- A custom VPC called myappvpc in the range 10.0.0.0/16
- Appsubnet with range 10.0.10.0/24 for application server - which is a public subnet
- dbsubnet1 with range 10.0.11.0/24 and dbsubnet2 with range 10.0.12.0/24 for the database - which are private subnets
- Routing table and Internet gateway entries
- 2 security groups, dbsecuritygroup for db and appsecuritygroup for app servers
- A subnet group with dbsubnet1 and dbsubnet2 for the database
- An EC2 instance with the Ubuntu 18.04 AMI for the application server with an Elastic IP associated with it. Ensure that the
Instance type is parameterized and allows choosing between t2.micro, m1.small and m1.large.
- An RDS instance for the database that is not publicly accessible
- Automation of the creation of the database and tables 
- Automation of the application
- Automation of setting up the necessary environment variables.

## How to run the template

To run the template, please sign into your AWS console, and go into Cloudformation. Once on cloud formation,
press on the create stack button. Within the Specify template, please select the upload a template file
radio button after which you will be required to upload the JoyelTemplate7 file which can be found
in this repository. Once selected, please press next. Now you will be asked to enter a stack name, followed
by parameters such as DBPassword, DBUser, InstanceTypeParameter and to select an already existing EC2 keypair.
Click the next button, then click the next button again after which you will be directed to the Review page
Ensure all the information is correct and if so, proceed to press the create stack button. This will set up the
infrastructure for you automatically.
