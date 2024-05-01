namespace LookALike_Server.Class
{
    public class User
    {
        string email;
        string firstName;
        string lastName;
        string image;
        int phoneNumber;
        DateTime dateOfBirth;
        string password;
        static List<User> users = new List<User>();

        public User() { }

        public string Email { get => email; set => email = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Image { get => image; set => image = value; }
        public int PhoneNumber { get => phoneNumber; set => phoneNumber = value; }
        public DateTime DateOfBirth { get => dateOfBirth; set => dateOfBirth = value; }
        public string Password { get => password; set => password = value; }

        public User(string email, string firstName, string lastName, string image, int phoneNumber, DateTime dateOfBirth, string password)
        {
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.image = image;
            this.phoneNumber = phoneNumber;
            this.dateOfBirth = dateOfBirth;
            this.password = password;
        }


        public int Insert()
        {
            DBservices dbs = new DBservices();
            List<User> AllUsers = dbs.ReadUsers();
            if (AllUsers.Exists(user => user.email == email)) //to check that a user is not sign with the same email
            {
                return -1;
            }
            return dbs.Insert(this);
        }

        public List<User> Read()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadUsers();
        }

        public User UserLogin()
        {

            List<User> AllUsers = Read();
            User FindUserInList = AllUsers.Find(user => user.Email == this.Email && user.Password == this.Password);
            return FindUserInList;

        }

        public int UpdateUser()
        {
            DBservices dbs = new DBservices();
            return dbs.UpdateUser(this);

        }
    }
}
