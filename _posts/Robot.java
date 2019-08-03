abstract class Robot
{
    private String name;

    public void greeting()
    {
        System.out.println("Hi, I am a robot");
    }

    abstract void move();
    
    public String getName()
    {
        return name;
    }
    public void setName(String name)
    {
        this.name = name;
    }
}