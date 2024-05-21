namespace LookALike_Server.Class
{
    public class ManualLook
    {
        int lookId;
        int topSelection_ItemId;
        int buttomSelection_ItemId;
        string topSelection_Image;
        string buttomSelection_Image;
        DateTime createdDate;
        DateTime calendarDate;
        string userEmail;

        public int LookId { get => lookId; set => lookId = value; }
        public int TopSelection_ItemId { get => topSelection_ItemId; set => topSelection_ItemId = value; }
        public int ButtomSelection_ItemId { get => buttomSelection_ItemId; set => buttomSelection_ItemId = value; }
        public string TopSelection_Image { get => topSelection_Image; set => topSelection_Image = value; }
        public string ButtomSelection_Image { get => buttomSelection_Image; set => buttomSelection_Image = value; }
        public DateTime CreatedDate { get => createdDate; set => createdDate = value; }
        public DateTime CalendarDate { get => calendarDate; set => calendarDate = value; }
        public string UserEmail { get => userEmail; set => userEmail = value; }

        public ManualLook() { }

        public ManualLook(int lookId, int topSelection_ItemId, int buttomSelection_ItemId, string topSelection_Image, string buttomSelection_Image, DateTime createdDate, DateTime calendarDate, string userEmail)
        {
            LookId = -1;
            TopSelection_ItemId = topSelection_ItemId;
            ButtomSelection_ItemId = buttomSelection_ItemId;
            TopSelection_Image = topSelection_Image;
            ButtomSelection_Image = buttomSelection_Image;
            CreatedDate = createdDate;
            CalendarDate = calendarDate;
            UserEmail = userEmail;
        }

        public List<ManualLook> Read()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadAllManualLook();
        }

        public bool Insert()
        {
            DBservices dbs = new DBservices();
            List<ManualLook> AllManualLook = Read();
            foreach (ManualLook I in AllManualLook)
            {

                if (I.TopSelection_ItemId == this.TopSelection_ItemId && I.ButtomSelection_ItemId == this.ButtomSelection_ItemId)
                {
                    return false;
                }
            }
            dbs.Insert(this);
            return true;
        }
    }
}
