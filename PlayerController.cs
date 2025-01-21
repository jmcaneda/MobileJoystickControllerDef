using System;
using System.Collections;
using UnityEngine;
using UnityEngine.AI;

public class PlayerController : MonoBehaviour
{
    public float moveSpeed = 5f;
    public float jumpForce = 5f;
    public float rotationSpeed = 100f;
    private Vector3 movement;
    private NavMeshAgent agent;
    private Animator animator;

    void Start()
    {
        agent = GetComponent<NavMeshAgent>();
        animator = GetComponent<Animator>();
        agent.speed = moveSpeed;
        animator.Play("Idle");
    }

    void Update()
    {
        if (!GameManager.instancia.inputRemote) HandleKeyboardInput();
        if (movement != Vector3.zero)
        {
            agent.Move(movement * Time.deltaTime);
            transform.rotation = Quaternion.Slerp(transform.rotation,
                Quaternion.LookRotation(movement),
                Time.deltaTime * rotationSpeed);
            animator.Play("Walk");

        }
        else
        {
            animator.Play("Idle");
        }

    }

    void HandleKeyboardInput()
    {
        float horizontalInput = Input.GetAxis("Horizontal");
        float verticalInput = Input.GetAxis("Vertical");

        // WASD or Arrow keys
        if (horizontalInput != 0 || verticalInput != 0)
        {
            movement = new Vector3(horizontalInput, 0, verticalInput) * moveSpeed;

            animator.SetFloat("Horizontal", horizontalInput);
            animator.SetFloat("Vertical", verticalInput);

        }
        else
        {
            movement = Vector3.zero;
        }

    }

    void HandleJoystickInput(string jsonData)
    {
        if (GameManager.instancia.inputRemote)
        {
            JoystickData data = JsonUtility.FromJson<JoystickData>(jsonData);
            movement = new Vector3(data.x, 0, data.y) * moveSpeed;

            animator.SetFloat("Horizontal", data.x);
            animator.SetFloat("Vertical", data.y);
        }
    }

    void HandleButtonInput(string jsonData)
    {
        if (GameManager.instancia.inputRemote)
        {
            ButtonData data = JsonUtility.FromJson<ButtonData>(jsonData);
            if (data.state == "pressed")
            {
                switch (data.action)
                {
                    case "up":
                        {
                            movement = Vector3.forward * moveSpeed;
                            animator.SetFloat("Horizontal", movement.x);
                            animator.SetFloat("Vertical", movement.y);
                            break;
                        }
                    case "down":
                        {
                            movement = Vector3.back * moveSpeed;
                            animator.SetFloat("Horizontal", movement.x);
                            animator.SetFloat("Vertical", movement.y);
                            break;
                        }
                    case "left":
                        {
                            movement = Vector3.left * moveSpeed;
                            animator.SetFloat("Horizontal", movement.x);
                            animator.SetFloat("Vertical", movement.y);
                            break;
                        }
                    case "right":
                        {
                            movement = Vector3.right * moveSpeed;
                            animator.SetFloat("Horizontal", movement.x);
                            animator.SetFloat("Vertical", movement.y);
                            break;
                        }
                    case "A":
                        {
                            break;
                        }
                    case "B":
                        {
                            // Iniciar el desplazamiento a la siguiente esquina
                            GameManager.instancia.indiceEsquinaActual = (GameManager.instancia.indiceEsquinaActual + 1) % GameManager.instancia.esquinas.Length;
                            GameManager.instancia.offset = GameManager.instancia.esquinas[GameManager.instancia.indiceEsquinaActual];
                            break;
                        }
                }

            }
            else if (data.state == "released")
            {
                if (data.action != "A" && data.action != "B")
                {
                    movement = Vector3.zero;
                }
            }
        }
    }

    void HandleInputMethod(string jsonData)
    {
        InputMethodData data = JsonUtility.FromJson<InputMethodData>(jsonData);
        switch (data.state)
        {
            case "on": GameManager.instancia.inputRemote = true; break;
            case "off": GameManager.instancia.inputRemote = false; break;
        }
    }

}


[System.Serializable]
public class JoystickData
{
    public float x;
    public float y;
}

[System.Serializable]
public class ButtonData
{
    public string action;
    public string state;
}

[System.Serializable]
public class InputMethodData
{
    public string state;
}
