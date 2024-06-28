namespace LookALike_Server.Class
{
    public class PopupDetails
    {
        int id;
        string email;
        int itemId;
        static List<PopupDetails> AllPopUpDetails = new List<PopupDetails>();

        public PopupDetails(int id, string email, int itemId)
        {
            Id = id;
            Email = email;
            ItemId = itemId;
        }

        public PopupDetails() { }

        public int Id { get => id; set => id = value; }
        public string Email { get => email; set => email = value; }
        public int ItemId { get => itemId; set => itemId = value; }

        public bool Insert()
        {
            DBservices dbs = new DBservices();
            dbs.InsertNewPopupDetails(this);
            return true;
        }

        public List<object> Read()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadAllPopupDetails();
        }

    }
}
