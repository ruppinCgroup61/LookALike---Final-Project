namespace LookALike_Server.Class
{
    public class Colors
    {
        string color_name;

        public Colors(string color_name)
        {
            this.color_name = color_name;
        }
        public Colors() { }

        public string Color_name { get => color_name; set => color_name = value; }

        public List<Colors> Read()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadColors();
        }
    }
}
