export default function Footer() {
  return (
    <footer className="w-full text-center py-4 border-t bg-background text-muted-foreground">
      &copy; {new Date().getFullYear()} DEVHUB. All rights reserved.
    </footer>
  );
}
