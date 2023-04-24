# File Manager

## Description
The file manager is able to do the following:

- Work using CLI
- Perform basic file operations (copy, move, delete, rename, etc.)
- Utilize Streams API
- Get information about the host machine operating system
- Perform hash calculations
- Compress and decompress files

## Usage
The program is started by npm-script start in following way:
```shell
npm run start -- --username=your_username
```
To finish work ```ctrl + c``` pressed or sent ```.exit``` command into console.

At the start of the program and after each end of input/operation current working directory is printed.

## List of operations and their syntax
### Navigation & working directory (nwd)
Go upper from current directory:
```shell
up
```
Go to dedicated folder from current directory:
```shell
cd path_to_directory
```
Print in console list of all files and folders in current directory:
```shell
ls
```

### Basic operations with files
Read file and print it's content in console:
```shell
cat path_to_file
```
Create empty file in current working directory:
```shell
add new_file_name
```
Rename file:
```shell
rn path_to_file new_filename
```
Copy file:
```shell
cp path_to_file path_to_new_directory
```
Move file:
```shell
mv path_to_file path_to_new_directory
```
Delete file:
```shell
rm path_to_file
```

### Operating system info
Get EOL (default system End-Of-Line) and print it to console:
```shell
os --EOL
```
Get host machine CPUs info and print it to console:
```shell
os --cpus
```
Get home directory and print it to console: 
```shell
os --homedir
```
Get current system user name and print it to console:
```shell
os --username
```
Get CPU architecture for which Node.js binary has compiled and print it to console:
```shell
os --architecture
```

### Hash calculation
Calculate hash for file and print it into console:
```shell
hash path_to_file
```

### Compress and decompress operations
Compress file: 
```shell
compress path_to_file path_to_destination
```
Decompress file:
```shell
decompress path_to_file path_to_destination
```
