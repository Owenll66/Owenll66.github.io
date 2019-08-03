class Main
{
    public static void main(String[] args)
    {
        Robot robot = new Robot(){
            @Override
            void move() {
                System.out.println("The robot is moving");
            }
        };
        robot.move();
    }
}